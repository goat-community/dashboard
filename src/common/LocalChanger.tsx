import { LocalesMenuButton } from "react-admin";

export function LocalChanger(): JSX.Element {
  return (
    <div className="local-changer-container">
      <LocalesMenuButton
        languages={[
          { locale: "en", name: "English" },
          { locale: "de", name: "Deutsche" }
        ]}
      />
    </div>
  );
}
