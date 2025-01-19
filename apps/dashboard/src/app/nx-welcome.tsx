import { useSelector } from "react-redux";
import { RootState } from "@micro-frontend-tutorial/shared";

/*
 * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 This is a starter component and can be deleted.
 * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 Delete this file and get started with your project!
 * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */
export function NxWelcome({ title }: { title: string }) {
  const count = useSelector<RootState>((state) => state.counter.value) as number;
  return (
    <>
      <div className="wrapper">
        <div className="container">
          <div id="welcome">
            <h1>
              <span> Hello there, </span>
              Welcome {title} ({count}) 👋
            </h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default NxWelcome;
