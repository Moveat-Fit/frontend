import Image from "next/image";
import MyIcon from '@/assets/undraw_authentication_tbfc.svg';

export default function SectionSide() {
    return (
        <div className='bg-primary-custom rounded-tl-[40%] w-1/2'>
            {/* <h1 className='font-montserrat-alternates text-2xl py-8 pr-8 absolute left-8 text-primary-custom font-semibold'>moveat</h1> */}
            <div className='flex flex-col justify-between text-right h-full text-white'>
                <h1 className='font-montserrat-alternates text-2xl py-8 pr-8'>moveat</h1>
                <footer className="flex items-center justify-center">
                    <Image src={MyIcon} width={450} height={0} alt='' />
                    {/* <p className='text-[20px]'>“Alimentação e treino que se movem junto para o seu melhor desempenho.”</p> */}
                </footer>
            </div>
        </div>
    );
};