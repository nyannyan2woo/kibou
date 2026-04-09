import { CSSProperties } from "react";

/** Material Symbols Rounded アイコンコンポーネントのProps */
interface IconProps {
  /** アイコン名（Material Symbols準拠） */
  name: string;
  /** アイコンサイズ（px）。デフォルト: 24 */
  size?: number;
  className?: string;
  /** 塗りつぶしスタイルにするか */
  filled?: boolean;
  style?: CSSProperties;
}

/** Material Symbols Rounded を統一的に描画する汎用アイコンコンポーネント */
export default function Icon({ name, size = 24, className = "", filled = false, style }: IconProps) {
  return (
    <span
      className={`material-symbols-rounded ${className}`}
      style={{
        fontSize: size,
        fontVariationSettings: `'FILL' ${filled ? 1 : 0}, 'wght' 400, 'GRAD' 0, 'opsz' ${size}`,
        lineHeight: 1,
        verticalAlign: "middle",
        ...style,
      }}
      aria-hidden="true"
    >
      {name}
    </span>
  );
}
