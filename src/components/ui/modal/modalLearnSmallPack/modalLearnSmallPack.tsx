import { Button } from 'src/components/ui/button/button.tsx'
import { CrossIcon } from 'src/components/ui/icons/ crossIcon.tsx'
import s from './modalLearnSmallPack.module.scss'
import {ModalLearnPackName} from "src/components/ui/modal/modalLeanPackName/modalLeanPackName.tsx";
import {useState} from "react";
import {ModalType} from "src/components/ui/packListVersial/myPack/MyPack.tsx";

type ModalAddNewPackType = {
    closeModal: () => void
}
export const ModalLearnSmallPack = (props: ModalAddNewPackType) => {
    const [isModalOpen, setModalOpen] = useState<ModalType>('')

    return (
        <div className={s.overlay}>
            <div className={s.modalContainer}>
                <div className={s.modal}>
                        <h2>Learn “Pack Name”</h2>
                        <div onClick={props.closeModal} className={s.crossIcon}>
                            <CrossIcon />
                        </div>

                    <div className={s.body}>
                        <div className={s.text}>
                            Question: How "This" works in JavaScript?
                        </div>
                        <div className={s.answer}>
                            Количество попыток ответов на вопрос: 10
                        </div>
                    </div>
                    <div className={s.button}>
                        <Button className={s.bts}
                                onClick={()=>{<ModalLearnPackName closeModal={()=>{setModalOpen('')}}/>}}
                                variant="primary">
                           Shaw Answer
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
