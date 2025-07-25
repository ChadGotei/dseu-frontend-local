import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }; // Update state so fallback UI is shown
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught an error:", error, info);
    // Optional: Log to monitoring service
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center text-red-600 py-10">
          <p className="text-lg font-semibold">Something went wrong.</p>
          <p className="text-sm">Please refresh the page or try again later.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
