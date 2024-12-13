import React, { useEffect, useRef } from "react";

function withLogger<P extends React.JSX.IntrinsicAttributes>(
  WrappedComponent: React.ComponentType<P>
) {
  return function LoggerComponent(props: P) {
    const renderCount = useRef<number>(parseInt(localStorage.getItem(`${WrappedComponent.name}RenderCount`) || "0"));

    useEffect(() => {
      renderCount.current += 1;

      localStorage.setItem(`${WrappedComponent.name}RenderCount`, renderCount.current.toString());

      console.log(`Component ${WrappedComponent.name}, Rendering count: ${renderCount.current}`);
    }, []);

    return <WrappedComponent {...props} />;
  };
}

export default withLogger;
