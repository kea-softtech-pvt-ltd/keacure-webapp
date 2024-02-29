import { WhatsappIcon, WhatsappShareButton } from 'react-share';
import { useEffect, useState } from 'react';
import AppointmentsApi from '../../../services/AppointmentsApi';

export default function SharingSharing(props) {
    const { downloadPrescription } = AppointmentsApi()
    const { reportId } = props
    const [shareUrl, setShareUrl] = useState([])
    useEffect(() => {
        SharePdf()
    }, [])
    const SharePdf = () => {
        downloadPrescription(reportId)
            .then((result) => {
                setShareUrl(result)
            })
    }

    return (
        <div className='whatsApp'>
            <WhatsappShareButton
                quote='Prescription'
                url={shareUrl}>
                <WhatsappIcon size={35} round={true} />
            </WhatsappShareButton >
        </div>
    )
}
