import Image from 'next/image';

export default function Home() {
  return (
    <main className="bg-[#0F0F0F] text-white min-h-screen flex flex-col items-center justify-center px-4 pt-16">
      <div className="w-full max-w-md h-auto mt-10 mb-6">
        <Image
          alt="Logo tarefas"
          src="/assets/hero.png"
          className="object-contain rounded-lg w-full h-auto"
          width={579}
          height={353}
          priority
        />
      </div>

      <h1 className="text-3xl font-bold text-center leading-relaxed tracking-wide max-w-160 p-10">
        Sistema feito para você organizar seus estudos e tarefas
      </h1>

      <section className="flex flex-wrap items-center justify-center gap-4">
        <div className="bg-[#FAFAFA] w-[160px] h-[40px] rounded-lg flex items-center justify-center px-2 transition-transform duration-300 hover:scale-105">
          <p className="text-black text-sm font-semibold truncate">
            + 7 mil posts
          </p>
        </div>

        <div className="bg-[#FAFAFA] w-[160px] h-[40px] rounded-lg flex items-center justify-center px-2 transition-transform duration-300 hover:scale-105">
          <p className="text-black text-sm font-semibold truncate">
            + 1 mil comentários
          </p>
        </div>
      </section>
    </main>
  );
}











