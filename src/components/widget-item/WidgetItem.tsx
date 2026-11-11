import type { ReactNode } from "react";

interface Props {
  title: string;
  value: string | number;
  subtitle: string;
  icon: ReactNode;
  iconBgColor: string;
  iconTextColor: string;
}

export const WidgetItem = ({
  title,
  value,
  subtitle,
  icon,
  iconBgColor,
  iconTextColor,
}: Props) => {
  return (
    <div className="rounded-3xl border border-[#f5f1ff] bg-white p-5 shadow-[0_4px_20px_rgba(94,71,146,0.03)]">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl">
        <div
          className={`flex h-full w-full items-center justify-center rounded-2xl ${iconBgColor} ${iconTextColor}`}
        >
          {icon}
        </div>
      </div>

      <p className="mt-5 text-xs font-semibold text-[#aaa2bd]">{title}</p>

      <h3 className="mt-1 text-2xl font-black text-[#242038]">{value}</h3>

      <p className="mt-1 text-xs text-[#aaa2bd]">{subtitle}</p>
    </div>
  );
};
