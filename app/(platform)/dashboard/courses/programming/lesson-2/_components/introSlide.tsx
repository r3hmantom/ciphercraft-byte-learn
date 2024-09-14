export default function IntroSlide({ title, content }) {
    return (
      <div className="p-4">
        <h1 className="text-xl font-bold mb-2">{title}</h1>
        <p>{content}</p>
      </div>
    );
  }
  