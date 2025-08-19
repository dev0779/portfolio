import { useContext, useState } from "react";
import styled from "styled-components";
import { GlobalThemeContext } from "@/Theme/GlobalThemeProvider";
import { Dialog } from "@/components/Dialog/Dialog";
import { Login, Register } from "./Features/Auth";
import "./app.scss";
import "./Theme/theme-preview.scss";

const Box = styled.div`
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  border: 2px solid ${({ theme }) => theme.text};
  padding: 2rem;
  font-family: ${({ theme }) => theme.fonts.fontFamilyBody};
  transition: background 0.3s ease, color 0.3s ease;
`;

function App() {
  const { toggle } = useContext(GlobalThemeContext);
  const [login, setLogin] = useState<boolean>(false);
  const [register, setRegister] = useState<boolean>(false);

  return (
    <>
      <div className="p-4">
        <Box>Hello! This uses the global theme.</Box>
        <button
          className="mt-4 p-2 bg-blue-500 text-white rounded"
          onClick={toggle}
        >
          Toggle Theme
        </button>
      </div>
      <div className="appNav">
        <button
          className="mr-4 bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => setLogin(!login)}
        >
          Login
        </button>
        <button
          className="ml-4 bg-green-500 text-white px-4 py-2 rounded"
          onClick={() => setRegister(!register)}
        >
          Register
        </button>
      </div>

      <Dialog open={login} onOpenChange={setLogin}>
          <Login
            onSuccess={() => {
              setLogin(false);
            }}
          />
       
      </Dialog>

      <Dialog open={register} onOpenChange={setRegister}>
          <Register
            onSuccess={() => {
              setRegister(false);
            }}
          />
      </Dialog>

      <div className="color-preview">
        <div className="color-box primary">Primary</div>
        <div className="color-box background">Background</div>
        <div className="color-box text">Text</div>
        <div className="color-box error">Error</div>
        <div className="color-box gray">Gray</div>
      </div>
    </>
  );
}

export default App;
