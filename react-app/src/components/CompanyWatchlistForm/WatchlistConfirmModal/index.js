import { useState } from "react";
import { useEffect } from "react";
import { Modal } from '../../../context/Modal'
import WatchlistConfirm from "./WatchlistConfirm";

const WatchlistConfirmModal = ({setAddToWatchlist}) => {
    const [showModal, setShowModal] = useState(false)

    // useEffect(() => {
    //     const confirmInterval = setInterval(() => {
    //         setAddToWatchlist(false)
    //     }, 1000)
    //     return () => {clearInterval(confirmInterval)}
    // })

    const onClose = () => {
        setAddToWatchlist(false)
    }

    return (
        <>
            {setAddToWatchlist && (
                <Modal onClose={onClose}>
                    <WatchlistConfirm
                        setShowModal={setShowModal}
                        showModal={showModal}
                        setAddToWatchlist={setAddToWatchlist}
                    />
                </Modal>
            )}
        </>
      );
}

export default WatchlistConfirmModal
