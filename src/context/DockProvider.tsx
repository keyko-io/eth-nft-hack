import React, {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface DockerProviderValue {
  isActive: boolean;
  toggleActive: () => void;
}

const DockerContext = createContext({} as DockerProviderValue);

function DockerProvider({ children }: { children: ReactNode }): ReactElement {
  const [isActive, setIsActive] = useState(false);

  const toggleActive = () => {
    setIsActive(!isActive);
  };

  return (
    <DockerContext.Provider
      value={
        {
          isActive,
          toggleActive,
        } as DockerProviderValue
      }
    >
      {children}
    </DockerContext.Provider>
  );
}

const useDocker = (): DockerProviderValue => useContext(DockerContext);
export { DockerProvider, useDocker, DockerContext };
