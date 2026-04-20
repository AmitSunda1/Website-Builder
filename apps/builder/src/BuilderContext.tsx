import React, {
  createContext,
  useContext,
  useReducer,
  type ReactNode,
} from "react";
import { v4 as uuidv4 } from "uuid";
import type {
  SectionInstance,
  ThemeOverride,
  PanelTab,
  StylePreset,
  TemplatePreset,
} from "./types";

// ─── State ────────────────────────────────────────────────────────────────────

interface BuilderState {
  sections: SectionInstance[];
  theme: ThemeOverride;
  activeTab: PanelTab;
  stylePreset: StylePreset;
  templatePreset: TemplatePreset;
  selectedSectionId: string | null;
  projectName: string;
  repoName: string;
  githubToken: string;
  githubOwner: string;
  appState: "onboarding" | "builder";
  projectId: string | null;
}

const DEFAULT_THEME: ThemeOverride = {
  name: "default",
  colors: {
    primary: "#6366f1",
    primaryFg: "#ffffff",
    secondary: "#8b5cf6",
    background: "#ffffff",
    surface: "#f8fafc",
    text: "#0f172a",
  },
  typography: {
    fontFamily: "'Inter', -apple-system, sans-serif",
  },
};

const initialState: BuilderState = {
  sections: [],
  theme: DEFAULT_THEME,
  activeTab: "sections",
  stylePreset: "all",
  templatePreset: "starter",
  selectedSectionId: null,
  projectName: "my-website",
  repoName: "my-website",
  githubToken: "",
  githubOwner: "",
  appState: "onboarding",
  projectId: null,
};

// ─── Actions ──────────────────────────────────────────────────────────────────

type Action =
  | {
      type: "ADD_SECTION";
      sectionType: string;
      defaultProps: Record<string, unknown>;
    }
  | { type: "REMOVE_SECTION"; id: string }
  | { type: "UPDATE_SECTION_PROPS"; id: string; props: Record<string, unknown> }
  | { type: "MOVE_SECTION"; fromIndex: number; toIndex: number }
  | { type: "SELECT_SECTION"; id: string | null }
  | { type: "SET_TAB"; tab: PanelTab }
  | { type: "SET_STYLE_PRESET"; preset: StylePreset }
  | { type: "SET_TEMPLATE_PRESET"; preset: TemplatePreset }
  | { type: "UPDATE_THEME"; overrides: Partial<ThemeOverride> }
  | { type: "UPDATE_THEME_COLORS"; colors: Partial<ThemeOverride["colors"]> }
  | { type: "SET_PROJECT_NAME"; name: string }
  | { type: "SET_REPO_NAME"; name: string }
  | { type: "SET_GITHUB_TOKEN"; token: string }
  | { type: "SET_GITHUB_OWNER"; owner: string }
  | { type: "FINISH_ONBOARDING"; projectId: string }
  | { type: "HYDRATE_SECTIONS"; sections: SectionInstance[] }
  | { type: "SET_SECTIONS"; sections: SectionInstance[] }
  | { type: "LOAD_TEMPLATE"; sections: SectionInstance[] };

function reducer(state: BuilderState, action: Action): BuilderState {
  switch (action.type) {
    case "ADD_SECTION":
      return {
        ...state,
        sections: [
          ...state.sections,
          {
            id: uuidv4(),
            type: action.sectionType,
            props: { ...action.defaultProps },
          },
        ],
        selectedSectionId: null,
      };

    case "LOAD_TEMPLATE": {
      // NOTE: We assume the caller checks registry entries. We fall back to {} bounds just in case.
      // Since BuilderContext doesn't import registry directly to avoid cycles or heavy lifting here,
      // it's best if the dispatch passes the resolved defaultProps, OR the caller triggers ADD_SECTION iteratively.
      // Wait, we can pass fully initialized sections in HYDRATE_SECTIONS, or we could modify LOAD_TEMPLATE
      // to accept full sections array. Let's just use HYDRATE_SECTIONS to also load templates!
      // Actually, since HYDRATE_SECTIONS takes SectionInstance[], I'll rename HYDRATE_SECTIONS to SET_SECTIONS to be generic.
      return state;
    }

    case "REMOVE_SECTION":
      return {
        ...state,
        sections: state.sections.filter((s) => s.id !== action.id),
        selectedSectionId:
          state.selectedSectionId === action.id
            ? null
            : state.selectedSectionId,
      };

    case "UPDATE_SECTION_PROPS":
      return {
        ...state,
        sections: state.sections.map((s) =>
          s.id === action.id
            ? { ...s, props: { ...s.props, ...action.props } }
            : s,
        ),
      };

    case "MOVE_SECTION": {
      const secs = [...state.sections];
      const [moved] = secs.splice(action.fromIndex, 1);
      if (!moved) return state;
      secs.splice(action.toIndex, 0, moved);
      return { ...state, sections: secs };
    }

    case "SELECT_SECTION":
      return {
        ...state,
        selectedSectionId: action.id,
        activeTab: action.id ? "sections" : state.activeTab,
      };

    case "SET_TAB":
      return { ...state, activeTab: action.tab };

    case "SET_STYLE_PRESET":
      return { ...state, stylePreset: action.preset };
    case "SET_TEMPLATE_PRESET":
      return { ...state, templatePreset: action.preset };

    case "UPDATE_THEME":
      return { ...state, theme: { ...state.theme, ...action.overrides } };

    case "UPDATE_THEME_COLORS":
      return {
        ...state,
        theme: {
          ...state.theme,
          colors: { ...state.theme.colors, ...action.colors },
        },
      };

    case "SET_PROJECT_NAME":
      return { ...state, projectName: action.name };

    case "SET_REPO_NAME":
      return { ...state, repoName: action.name };

    case "SET_GITHUB_TOKEN":
      return { ...state, githubToken: action.token };

    case "SET_GITHUB_OWNER":
      return { ...state, githubOwner: action.owner };

    case "FINISH_ONBOARDING":
      return { ...state, projectId: action.projectId, appState: "builder" };

    case "HYDRATE_SECTIONS":
    case "SET_SECTIONS":
      return { ...state, sections: action.sections, selectedSectionId: null };

    // We can also have the explicit LOAD_TEMPLATE for future, but mapped locally if needed:
    // ...

    default:
      return state;
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────

const BuilderStateCtx = createContext<BuilderState | null>(null);
const BuilderDispatchCtx = createContext<React.Dispatch<Action> | null>(null);

const STORAGE_KEY = "wb-v2-state";

export function BuilderProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState, (initial) => {
    if (typeof window === "undefined") return initial;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Partial<BuilderState>;
        return {
          ...initial,
          ...parsed,
          theme: {
            ...initial.theme,
            ...(parsed.theme ?? {}),
            colors: {
              ...initial.theme.colors,
              ...(parsed.theme?.colors ?? {}),
            },
            typography: {
              ...initial.theme.typography,
              ...(parsed.theme?.typography ?? {}),
            },
          },
        } as BuilderState;
      }
    } catch {
      // fallback to initial state on error
    }
    return initial;
  });

  React.useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore write errors
    }
  }, [state]);

  return (
    <BuilderStateCtx.Provider value={state}>
      <BuilderDispatchCtx.Provider value={dispatch}>
        {children}
      </BuilderDispatchCtx.Provider>
    </BuilderStateCtx.Provider>
  );
}

export function useBuilderState(): BuilderState {
  const ctx = useContext(BuilderStateCtx);
  if (!ctx)
    throw new Error("useBuilderState must be used within BuilderProvider");
  return ctx;
}

export function useBuilderDispatch(): React.Dispatch<Action> {
  const ctx = useContext(BuilderDispatchCtx);
  if (!ctx)
    throw new Error("useBuilderDispatch must be used within BuilderProvider");
  return ctx;
}
