import Image from "next/image";
import MyIcon from '@/assets/undraw_athletes-training_koqa.svg';

export default function SectionSide() {
    return (
        <div className='bg-primary-custom rounded-tr-[40%] w-1/2'>
            {/* <h1 className='font-montserrat-alternates text-2xl py-8 pr-8 absolute left-8 text-primary-custom font-semibold'>moveat</h1> */}
            <div className='flex flex-col justify-between text-left h-full text-white'>
                <h1 className='font-montserrat-alternates text-2xl py-8 pl-8'>moveat</h1>
                <footer className="flex items-center justify-center">
                    <Image src={MyIcon} width={1050} height={0} alt='' />
                    {/* <p className='text-[20px]'>“Alimentação e treino que se movem junto para o seu melhor desempenho.”</p> */}
                </footer>
            </div>
        </div>
    );
};