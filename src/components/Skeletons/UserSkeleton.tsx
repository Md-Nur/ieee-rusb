const UserSkeleton = () => {
  return (
    <div className="flex max-w-7xl justify-center gap-8 flex-wrap mx-auto px-4 py-10">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="w-full sm:w-[350px] bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-xl border border-black/5 dark:border-white/5 animate-pulse"
        >
          <div className="h-80 bg-slate-200 dark:bg-slate-800" />
          <div className="p-8 text-center space-y-4">
            <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded-full w-3/4 mx-auto" />
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-full w-1/2 mx-auto" />
            <div className="pt-4 space-y-2">
              <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-full w-full" />
            </div>
            <div className="pt-4 border-t border-black/5 space-y-2">
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-full w-2/3 mx-auto" />
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-full w-1/3 mx-auto opacity-60" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserSkeleton;
