import React from "react";
import { useBuilderState, useBuilderDispatch } from "../BuilderContext";
import { getComponent } from "@website-builder/registry";
import type { SectionInstance } from "../types";

export function SectionList() {
  const { sections, selectedSectionId } = useBuilderState();
  const dispatch = useBuilderDispatch();

  if (sections.length === 0) {
    return (
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 16px",
        gap: "12px",
        textAlign: "center",
        color: "#4a4a6a",
        border: "1.5px dashed #2a2a3a",
        borderRadius: "12px",
        margin: "8px 0",
      }}>
        <span style={{ fontSize: "2rem" }}>◧</span>
        <div style={{ fontSize: "13px", fontWeight: 600, color: "#6b7280" }}>No sections yet</div>
        <div style={{ fontSize: "12px", color: "#4a4a6a", lineHeight: "1.5" }}>
          Pick sections from the panel above to build your page.
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      {sections.map((section, idx) => (
        <SectionCard
          key={section.id}
          section={section}
          index={idx}
          total={sections.length}
          isSelected={section.id === selectedSectionId}
          onSelect={() => dispatch({ type: "SELECT_SECTION", id: section.id })}
          onRemove={() => dispatch({ type: "REMOVE_SECTION", id: section.id })}
          onMoveUp={() => idx > 0 && dispatch({ type: "MOVE_SECTION", fromIndex: idx, toIndex: idx - 1 })}
          onMoveDown={() => idx < sections.length - 1 && dispatch({ type: "MOVE_SECTION", fromIndex: idx, toIndex: idx + 1 })}
        />
      ))}
    </div>
  );
}

function SectionCard({
  section,
  index,
  total,
  isSelected,
  onSelect,
  onRemove,
  onMoveUp,
  onMoveDown,
}: {
  section: SectionInstance;
  index: number;
  total: number;
  isSelected: boolean;
  onSelect: () => void;
  onRemove: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}) {
  let entry;
  try {
    entry = getComponent(section.type);
  } catch {
    return null;
  }

  return (
    <div
      id={`section-card-${section.id}`}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        padding: "10px 12px",
        backgroundColor: isSelected ? "#1e1e3a" : "#1a1a24",
        border: `1px solid ${isSelected ? "#6366f1" : "#2a2a3a"}`,
        borderRadius: "8px",
        cursor: "pointer",
        transition: "all 0.15s ease",
      }}
      onClick={onSelect}
    >
      {/* Index badge */}
      <div style={{
        width: "22px",
        height: "22px",
        borderRadius: "50%",
        backgroundColor: isSelected ? "#6366f130" : "#2a2a3a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "10px",
        fontWeight: 700,
        color: isSelected ? "#6366f1" : "#6b7280",
        flexShrink: 0,
      }}>
        {index + 1}
      </div>

      {/* Label */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: "12px", fontWeight: 600, color: isSelected ? "#a5b4fc" : "#e2e2f0", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {entry.displayName}
        </div>
        <div style={{ fontSize: "10px", color: "#6b7280" }}>{section.type}</div>
      </div>

      {/* Controls */}
      <div style={{ display: "flex", gap: "2px", flexShrink: 0 }} onClick={(e) => e.stopPropagation()}>
        <IconBtn icon="↑" title="Move up" disabled={index === 0} onClick={onMoveUp} />
        <IconBtn icon="↓" title="Move down" disabled={index === total - 1} onClick={onMoveDown} />
        <IconBtn icon="×" title="Remove" danger onClick={onRemove} />
      </div>
    </div>
  );
}

function IconBtn({ icon, title, onClick, disabled, danger }: {
  icon: string;
  title: string;
  onClick: () => void;
  disabled?: boolean;
  danger?: boolean;
}) {
  return (
    <button
      title={title}
      onClick={onClick}
      disabled={disabled}
      style={{
        width: "24px",
        height: "24px",
        borderRadius: "4px",
        border: "none",
        backgroundColor: "transparent",
        color: disabled ? "#3a3a5a" : danger ? "#ef4444" : "#6b7280",
        cursor: disabled ? "not-allowed" : "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "14px",
        fontWeight: 600,
        transition: "all 0.1s ease",
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          (e.currentTarget as HTMLButtonElement).style.backgroundColor = danger ? "#ef444420" : "#2a2a3a";
        }
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
      }}
    >
      {icon}
    </button>
  );
}
