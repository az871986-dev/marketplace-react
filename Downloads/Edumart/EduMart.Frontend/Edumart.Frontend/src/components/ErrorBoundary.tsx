import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    this.setState({
      error,
      errorInfo
    });
  }

  private handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  private handleRefresh = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-gradient-to-b from-red-50 to-white flex items-center justify-center px-4">
          <div className="max-w-2xl w-full text-center">
            {/* Error Icon */}
            <div className="mb-8">
              <svg
                className="w-32 h-32 mx-auto text-secondary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>

            {/* Content */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Oops! Something went wrong
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto">
              We encountered an unexpected error. Our team has been notified and is working on a fix.
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <button
                onClick={this.handleReset}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 shadow-sm hover:shadow-md w-full sm:w-auto"
              >
                Try Again
              </button>
              <button
                onClick={this.handleRefresh}
                className="bg-white hover:bg-gray-50 text-gray-700 px-8 py-3 rounded-lg font-medium transition-colors duration-200 border border-gray-300 w-full sm:w-auto"
              >
                Refresh Page
              </button>
            </div>

            {/* Error Details (Development Mode) */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="text-left bg-gray-50 rounded-lg p-4 max-w-2xl mx-auto mt-8">
                <summary className="cursor-pointer text-sm font-medium text-gray-700 hover:text-gray-900 mb-3">
                  Error Details (Development Only)
                </summary>
                <div className="space-y-4">
                  <div className="bg-red-50 border border-red-200 rounded p-3">
                    <p className="text-sm font-semibold text-red-800 mb-1">Error Message:</p>
                    <p className="text-xs text-red-700 font-mono">
                      {this.state.error.toString()}
                    </p>
                  </div>
                  {this.state.errorInfo && (
                    <div className="bg-gray-100 border border-gray-300 rounded p-3">
                      <p className="text-sm font-semibold text-gray-800 mb-1">Component Stack:</p>
                      <pre className="text-xs text-gray-700 font-mono whitespace-pre-wrap overflow-x-auto">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    </div>
                  )}
                  {this.state.error.stack && (
                    <div className="bg-gray-100 border border-gray-300 rounded p-3">
                      <p className="text-sm font-semibold text-gray-800 mb-1">Stack Trace:</p>
                      <pre className="text-xs text-gray-700 font-mono whitespace-pre-wrap overflow-x-auto">
                        {this.state.error.stack}
                      </pre>
                    </div>
                  )}
                </div>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
