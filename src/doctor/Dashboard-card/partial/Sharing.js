import { WhatsappIcon, WhatsappShareButton } from 'react-share';
import { useEffect, useState } from 'react';
import AppointmentsApi from '../../../services/AppointmentsApi';

export default function Sharing(props) {
    const { downloadPrescription } = AppointmentsApi()
    const { reportId } = props
    console.log("reportId", reportId)
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
//     const result = downloadPrescription(reportId)
//    const shareUrl = result

    return (
        <div className='whatsApp'>
            <WhatsappShareButton
                quote='Prescription'
                url={shareUrl}>
                <WhatsappIcon size={40} round={true} />
            </WhatsappShareButton >
        </div>
    )
}
