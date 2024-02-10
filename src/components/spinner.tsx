export function Spinner() {
  return (
    <div className="min-h-screen w-full fixed top-0 left-0 flex items-center justify-center z-50 bg-white dark:bg-primary">
      <div className="h-14 w-14 border-4 border-t-white/40 border-primary rounded-full animate-spin dark:border-white" />
    </div>
  );
}
