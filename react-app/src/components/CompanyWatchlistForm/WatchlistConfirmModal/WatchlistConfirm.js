import './WatchlistConfirm.css'

const WatchlistConfirm = ({showModal, setShowModal, setAddToWatchlist}) => {
    return (
        <div className="confirmation-modal">
            <span>Added!</span>
            <button className='confirm-close-btn' onClick={() => setAddToWatchlist(false)}>
                Close
            </button>
        </div>
    )
}

export default WatchlistConfirm
