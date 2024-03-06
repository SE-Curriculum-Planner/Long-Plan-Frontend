import { config } from "core/config";
import styled from "styled-components";
import Diagram from "common/components/diagram/flows/ReactFlowDiagram";

function LoginPage() {
  return (
    <>
      <div
        style={{ fontFamily: "IBM Plex Sans Thai, sans-serif" }}
        className="w-screen h-screen  flex justify-center items-center  bg-[#F7F7F8]"
      >
        <div className="w-3/5 h-4/5 m-8 flex-col rounded-2xl ">
          <div
            className=" flex top-16 left-6 w-full justify-center bg-blue-shadeb05 rounded-xl "
            style={{ fontSize: 24, color: "#3641A3" }}
          >
            CPE Normal Plan
          </div>
          <Diagram />
        </div>
        <Container>
          <div className="flex flex-col items-center ml-10">
            <img src="/imgs/login_logo.png" alt="" className="w-3/5" />
            <div className="mt-4">ลงชื่อเข้าสู่ระบบ</div>
            <LoginBtn
              className="login-btn"
              href={config.cmuOAuthUrl}
              target="_self"
            >
              <img
                src="/imgs/login_sub_logo.png"
                alt="emblem"
                className="object-scale-down w-8 flex-[1] mx-4"
              />
              <div className="flex justify-center items-center border-l border-[#6869AC] h-full w-16 flex-[2] mr-4">
                <p className="font-normal text-2xl text-white">CMU Account</p>
              </div>
            </LoginBtn>
          </div>
        </Container>
      </div>
    </>
  );
}

export default LoginPage;

const Container = styled.div`
  width: 100vh;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(/imgs/login_book.svg);
  background-size: cover;
`;

const LoginBtn = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;

  margin: 0 auto;
  margin-top: 0.5em;
  padding: 0.25em 0;

  max-width: 15em;
  height: 3.4em;
  width: 14em;

  font-size: 1.3em;

  border-radius: 5px;
  background: linear-gradient(90deg, #b1b1e7 0.83%, #6974d6 76.08%),
    var(--purple-5-purple, #6974d6);
`;
