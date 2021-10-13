import React from "react";
import { useEffect, useState } from "react";
import { interval, Observable, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import Section from "./components/section/Section";
import Watch from "./components/watch/Watch";
import Button from "./components/button/Button";

const initialStatus = "stop";
const initialCountOfClick = 0;
const initialCountOfRunOrStop = 0;
const initialTime = 0;
const intervalOfWatch = 1000;

export default function App() {
  const [sec, setSec] = useState(initialTime);
  const [status, setStatus] = useState(initialStatus);
  const [countOfClick, setCountOfClick] = useState(initialCountOfClick);
  const [countOfRunOrStop, setCountOfRunOrStop] = useState(
    initialCountOfRunOrStop
  );

  useEffect(() => {
    const unsubscribe$ = new Subject();
    interval(intervalOfWatch)
      .pipe(takeUntil(unsubscribe$))
      .subscribe(() => {
        if (status === "run") {
          setSec((val) => val + intervalOfWatch);
        }
      });
    return () => {
      unsubscribe$.next();
      unsubscribe$.complete();
    };
  }, [status]);

  useEffect(() => {
    if (countOfClick === 2) {
      setCountOfRunOrStop(initialCountOfRunOrStop);
      setStatus("wait");
    }
  }, [countOfClick]);

  useEffect(() => {
    if (countOfRunOrStop === 1) {
      setStatus("run");
    } else if (countOfRunOrStop !== 0) {
      setStatus("stop");
      setSec(initialTime);
      setCountOfRunOrStop(initialCountOfRunOrStop);
    }
  }, [countOfRunOrStop]);

  const runOrStop = function () {
    setCountOfRunOrStop(countOfRunOrStop + 1);
  };

  const reset = function () {
    setSec(initialTime);
  };

  const pauseClock = new Observable((observer) => {
    setTimeout(() => {
      observer.next(setCountOfClick(initialCountOfClick));
    }, 300);
    observer.next(setCountOfClick(countOfClick + 1));
  });

  const wait = function () {
    pauseClock.subscribe({
      next() {},
      complete() {},
    });
  };

  return (
    <div>
      <Section>
        <Button onHandleClick={wait} nameButton={"Wait"} btnColor={"blue"} />
        <Button
          onHandleClick={runOrStop}
          nameButton={"Start / Stop"}
          btnColor={"green"}
        />
        <Button onHandleClick={reset} nameButton={"Reset"} btnColor={"red"} />
      </Section>
      <Section>
        <Watch valueOfTime={sec} />
      </Section>
    </div>
  );
}
