import Image from "next/image";
import MyIcon from '@/assets/undraw_athletes-training_koqa.svg';

export default function SectionSide() {
    return (
        <div className='hidden lg:block bg-primary-custom rounded-tr-[40%] w-1/2'>
            <div className='flex flex-col justify-between text-left h-full text-white'>
                <h1 className='font-montserrat-alternates text-2xl py-8 pl-8'>moveat</h1>
                <footer className="flex items-center justify-center">
                    <Image className="hidden lg:block" src={MyIcon} width={800} height={0} alt='Athletes Training Image' />
                </footer>
            </div>
        </div>
    );
};