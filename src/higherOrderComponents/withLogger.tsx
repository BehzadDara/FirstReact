import React, { useEffect } from "react";
import useRenderCountStore from "../stores/useRenderCountStore.ts";

function withLogger<P extends React.JSX.IntrinsicAttributes>(
  WrappedComponent: React.ComponentType<P>
) {
  return function LoggerComponent(props: P) {
    const incrementRenderCount = useRenderCountStore((state) => state.incrementRenderCount);
    const renderCounts = useRenderCountStore((state) => state.renderCounts);

    const componentName = WrappedComponent.name;
    const renderCount = renderCounts[componentName] || 0;

    useEffect(() => {
      incrementRenderCount(componentName);

      console.log(`Component ${componentName}, Rendering count: ${renderCount + 1}`);

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [componentName, incrementRenderCount]);
    return <WrappedComponent {...props} />;
  };
}

export default withLogger;
