const LessonOneLayout = ({ children }: { children: React.ReactNode }) => {
    return (
      <div className="h-fit bg-slate-100">
        <main className="bg-slate-100 pb-20 pt-20 md:max-w-2xl mx-auto flex items-center h-fit">{children}</main>
      </div>
    );
  };
  
  export default LessonOneLayout;
  