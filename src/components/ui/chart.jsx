import * as React from "react";
import {
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  Legend as RechartsLegend,
} from "recharts";

import { cn } from "./utils";

// ---------- Constants ----------
const THEMES = { light: "", dark: ".dark" };

// ---------- Context ----------
const ChartContext = React.createContext(null);
export function useChart() {
  const context = React.useContext(ChartContext);
  if (!context) throw new Error("useChart must be used within a <ChartContainer />");
  return context;
}

// ---------- ChartContainer ----------
const ChartContainer = React.forwardRef(({ id, className, children, config = {}, ...props }, ref) => {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        ref={ref}
        data-slot="chart"
        data-chart={chartId}
        className={cn(
          // Minimal, safe selectors for Recharts SVG parts if you want to tweak visuals via CSS
          "[&_.recharts-cartesian-axis-tick_text]:text-muted-foreground [&_.recharts-cartesian-grid_line]:border/50 flex aspect-video justify-center text-xs [&_.recharts-dot]:transparent",
          className
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <ResponsiveContainer>{children}</ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
});
ChartContainer.displayName = "ChartContainer";
export { ChartContainer };

// ---------- ChartStyle: inject CSS variables for colors ----------
export function ChartStyle({ id, config = {} }) {
  // config: { key: { label?, icon?, color?, theme?: { light: '#...', dark: '#...' } } }
  const entries = Object.entries(config).filter(([k, v]) => v && (v.color || v.theme));
  if (!entries.length) return null;

  // Build CSS
  const css = Object.entries(THEMES)
    .map(([themeKey, prefix]) => {
      const lines = entries
        .map(([key, itemCfg]) => {
          const color =
            (itemCfg.theme && itemCfg.theme[themeKey]) || itemCfg.color || "";
          return color ? `  --color-${key}: ${color};` : "";
        })
        .filter(Boolean)
        .join("\n");
      if (!lines) return "";
      return `${prefix} [data-chart=${id}] {\n${lines}\n}`;
    })
    .filter(Boolean)
    .join("\n\n");

  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}

// ---------- Helpers ----------
function getPayloadConfigFromPayload(config = {}, item = {}, key) {
  // item is Recharts payload entry
  if (!item) return undefined;

  // try item.dataKey or item.name or key
  const candidate =
    (item.dataKey || item.name || key) + ""; // string key

  return config && candidate in config ? config[candidate] : undefined;
}

function formatValueForDisplay(val) {
  if (val == null) return "";
  if (typeof val === "number") return val.toLocaleString();
  return String(val);
}

// ---------- ChartTooltip wrapper (re-export) ----------
export const ChartTooltip = RechartsTooltip;

// ---------- ChartTooltipContent ----------
export function ChartTooltipContent({
  active,
  payload,
  className,
  indicator = "dot", // "dot" | "line" | "dashed"
  hideLabel = false,
  hideIndicator = false,
  label,
  labelFormatter,
  labelClassName,
  formatter,
  color,
  nameKey,
  labelKey,
}) {
  const { config = {} } = useChart();

  if (!active || !payload || !payload.length) return null;

  // derive label to show when top-level label provided or from payload
  const tooltipLabel = React.useMemo(() => {
    if (hideLabel || !payload.length) return null;
    const item = payload[0];
    // choose label value
    const labelVal =
      (labelKey && item.payload && item.payload[labelKey]) ||
      (item.name || item.dataKey) ||
      label;
    const labelText =
      typeof labelVal === "string"
        ? (config[labelVal] && config[labelVal].label) || labelVal
        : labelVal;
    if (!labelText) return null;
    if (labelFormatter) return <div className={cn("font-medium", labelClassName)}>{labelFormatter(labelText, payload)}</div>;
    return <div className={cn("font-medium", labelClassName)}>{labelText}</div>;
  }, [payload, hideLabel, label, labelFormatter, labelClassName, labelKey, config]);

  const nestLabel = payload.length === 1 && indicator !== "dot";

  return (
    <div
      className={cn(
        "border border-border/50 bg-background grid min-w-[8rem] items-start gap-1.5 rounded-lg px-2.5 py-1.5 text-xs shadow-xl",
        className
      )}
    >
      {!nestLabel && tooltipLabel}
      <div className="grid gap-1.5">
        {payload.map((entry, index) => {
          const key = `${nameKey || entry.name || entry.dataKey || "value"}`;
          const itemConfig = getPayloadConfigFromPayload(config, entry, key);
          const indicatorColor = color || (entry.payload && entry.payload.fill) || entry.color || (itemConfig && itemConfig.color);

          const displayValue =
            entry.value !== undefined ? (formatter ? formatter(entry.value, entry.name, entry, index, entry.payload) : formatValueForDisplay(entry.value)) : "";

          return (
            <div
              key={index}
              className={cn(
                "flex w-full flex-wrap items-stretch gap-2",
                indicator === "dot" && "items-center"
              )}
            >
              {/* Icon / indicator */}
              {itemConfig && itemConfig.icon ? (
                <div className="shrink-0">{React.createElement(itemConfig.icon)}</div>
              ) : (
                !hideIndicator && (
                  <div
                    className={cn(
                      "shrink-0 rounded-[2px] border",
                      indicator === "dot" ? "h-2.5 w-2.5" : indicator === "line" ? "w-1 h-6" : "w-0.5 h-4 border-dashed"
                    )}
                    style={{
                      backgroundColor: indicatorColor,
                      borderColor: indicatorColor,
                    }}
                  />
                )
              )}

              {/* Label + Value */}
              <div className={cn("flex flex-1 justify-between leading-none", nestLabel ? "items-end" : "items-center")}>
                <div className="grid gap-1.5">
                  {nestLabel ? tooltipLabel : <span className="text-muted-foreground">{(itemConfig && itemConfig.label) || entry.name}</span>}
                </div>
                {displayValue !== "" && (
                  <span className="text-foreground font-mono font-medium tabular-nums">
                    {typeof displayValue === "string" ? displayValue : displayValue}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ---------- ChartLegendContent ----------
export function ChartLegendContent({
  className,
  hideIcon = false,
  payload,
  verticalAlign = "bottom",
  nameKey,
}) {
  const { config = {} } = useChart();
  if (!payload || !payload.length) return null;

  return (
    <div
      className={cn(
        "flex items-center justify-center gap-4",
        verticalAlign === "top" ? "pb-3" : "pt-3",
        className
      )}
    >
      {payload.map((item, idx) => {
        const key = `${nameKey || item.dataKey || "value"}`;
        const itemConfig = config && config[key];
        const bgColor = (itemConfig && itemConfig.color) || (item && item.color);

        return (
          <div
            key={idx}
            className={cn("flex items-center gap-1.5")}
          >
            {!hideIcon && itemConfig && itemConfig.icon ? (
              React.createElement(itemConfig.icon)
            ) : (
              <div
                className="h-2 w-2 shrink-0 rounded-[2px]"
                style={{ backgroundColor: bgColor }}
              />
            )}
            <span>{(itemConfig && itemConfig.label) || item.value}</span>
          </div>
        );
      })}
    </div>
  );
}

// re-export Legend and Tooltip components for convenient imports
export const ChartLegend = RechartsLegend;
export const ChartTooltipBuiltin = RechartsTooltip;
