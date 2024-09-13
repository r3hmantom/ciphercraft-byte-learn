const LessonOneLayout = ({ children }: { children: React.ReactNode }) => {
    return (
      <div className="h-screen bg-slate-100">
        <main className="bg-slate-100 pb-20 pt-20 md:max-w-2xl mx-auto flex items-center h-screen">{children}</main>
      </div>
    );
  };
  
  export default LessonOneLayout;
  