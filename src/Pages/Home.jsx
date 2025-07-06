import StoryGenerate from '../components/StoryGenerate';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 text-white px-4 py-12">
  <h1 className="text-5xl sm:text-6xl font-extrabold mb-4 text-pink-400 tracking-tight text-center drop-shadow-lg">
    👻🧛 AI Story Generator 🩸💀
  </h1>
  <p className="text-xl sm:text-2xl text-pink-200 mb-8 text-center tracking-tight max-w-xl drop-shadow-md">
    Enter your idea and get a quick story… in your language! 🔮
  </p>
  <div className="w-full sm:w-[90%] md:w-[80%] lg:w-[800px] max-w-4xl bg-white/10 border border-pink-500 rounded-3xl shadow-[0_0_30px_#e11d4855] p-4 sm:p-6 md:p-8 backdrop-blur-lg">
    <StoryGenerate />
  </div>
</div>

  );
};

export default Home;

