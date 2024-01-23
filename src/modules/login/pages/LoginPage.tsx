import { config } from "core/config";
import styled from "styled-components";

function LoginPage() {
  return (
    <Container>
      <Login className="p-4 md:p-16">
        <img
          className="object-scale-down w-[20em] mx-auto mt-[-2em]"
          src="/images/logoFaculty.png"
        />
        <div className="topic-container">
          <p className="text-2xl font-semibold md:text-3xl">
            ระบบจัดการข้อมูลใบคำขอทั่วไป
          </p>
          <p className="font-normal text-base md:text-[1.35em]">
            คณะวิศวกรรมศาสตร์ มหาวิทยาลัยเชียงใหม่
          </p>
        </div>
        <div className="mt-12 text-center text-black text-base">
          ลงชื่อเข้าสู่ระบบ
        </div>
        <LoginBtn
          className="login-btn"
          href={config.cmuOAuthUrl}
          target="_self"
        >
          <img
            src="/images/cmu-logo.svg"
            alt="emblem"
            className="object-scale-down w-8 flex-[1]"
          />
          <div className="flex justify-center items-center border-l border-[#6869AC] h-full flex-[2]">
            <p className="font-normal text-2xl text-white">CMU Account</p>
          </div>
        </LoginBtn>
      </Login>
    </Container>
  );
}

export default LoginPage;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Login = styled.div`
  max-width: fit-content;
  max-height: fit-content;
  border-radius: 1.5em;
  background: #fff;
  filter: drop-shadow(0 0 20px rgba(0, 0, 0, 0.25));

  .topic-container {
    text-align: center;
    color: #68010e;
    margin-top: -5em;
  }
`;

const LoginBtn = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;

  margin: 0 auto;
  margin-top: 0.75em;
  padding: 0.25em 0;

  max-width: 15em;
  height: 3.4em;

  font-size: 1.3em;

  border-radius: 5px;
  background: linear-gradient(
      90deg,
      rgba(237, 242, 248, 0.35) 1.83%,
      rgba(237, 242, 248, 0) 76.08%
    ),
    var(--purple-5-purple, #6869ac);
`;
