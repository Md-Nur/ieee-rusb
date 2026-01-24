const ContentSkeleton = () => {
  return (
    <div className="flex max-w-7xl justify-center gap-8 flex-wrap mx-auto px-4 py-10">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="w-full sm:w-[380px] bg-white dark:bg-slate-900 rounded-3xl md:rounded-[2.5rem] overflow-hidden shadow-lg border border-black/5 dark:border-white/5 flex flex-col animate-pulse"
        >
          <div className="aspect-video bg-slate-200 dark:bg-slate-800" />
          <div className="p-6 md:p-8 flex flex-col flex-1 gap-6">
            <div className="space-y-4">
              <div className="h-7 bg-slate-200 dark:bg-slate-800 rounded-lg w-full" />
              <div className="h-7 bg-slate-200 dark:bg-slate-800 rounded-lg w-2/3" />
              <div className="h-1 w-12 bg-slate-200 dark:bg-slate-800 rounded-full" />
            </div>
            <div className="mt-auto pt-4 flex justify-between items-center">
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-full w-20" />
              <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContentSkeleton;
