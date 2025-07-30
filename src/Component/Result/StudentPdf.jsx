import jsPDF from 'jspdf';
import 'jspdf-autotable';

import logoUrl from "../../assets/DSEULogo/logo.png";
import { getCategoryFullname } from '../../utils/helper';

const StudentPdf = ({ student }) => {
    const handleDownload = async () => {
        await generatePDF(student);
    };

    const generatePDF = async (student) => {
        const doc = new jsPDF();

        const logoBase64 = await convertImageToBase64(logoUrl);
        if (logoBase64) {
            doc.addImage(logoBase64, 'PNG', 169, 15, 18, 20);
        }

        doc.setFontSize(18);
        doc.setFont('helvetica', 'bold');
        doc.text('Seat Allotment', 20, 20);
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text('Delhi Skill and Entrepreneurship University', 20, 30);
        doc.setLineWidth(0.5);
        doc.line(20, 40, 190, 40);

        doc.setFontSize(14);
        doc.text('Applicant Details', 20, 50);

        doc.autoTable({
            startY: 55,
            theme: 'grid',
            styles: { fontSize: 10 },
            head: [['Field', 'Value']],
            body: [
                student.form_number && ['Form Number', student.form_number],
                student.form_no && ['Form Number', student.form_no],
                ['Name', student.name],
                ['Program', student.program],
                ['Campus', student.campus],
                student.program_preference && ['Program Preference', student.program_preference],
                ['Registered Category', student.registered_category],
                student.category_allocated && ['Category Allocated', getCategoryFullname(student.category_allocated)],
                ['Rank', student.rank],
            ].filter(Boolean),
        });


        const finalY = doc.lastAutoTable.finalY || 80;

        // Add the important note
        doc.setFontSize(9);
        doc.setFont('helvetica', 'italic');
        doc.setTextColor(80);
        doc.text(
            'This is an auto-generated document. It does not require any signature and is only valid when presented with the fee slip.',
            20,
            finalY + 10,
            { maxWidth: 170 }
        );

        // Add contact email
        doc.setFontSize(8);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(100);
        doc.text(
            'helpdesk-admission@dseu.ac.in',
            20,
            doc.internal.pageSize.height - 10
        );

        doc.save(`${student.name.split(' ')[0] ?? ''} ${student.form_number || student.form_no}_Admission_Form.pdf`);
    };

    const convertImageToBase64 = (url) => {
        return new Promise((resolve) => {
            const img = new Image();
            img.crossOrigin = 'Anonymous';
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                resolve(canvas.toDataURL('image/png'));
            };
            img.onerror = () => resolve(null);
            img.src = url;
        });
    };

    return (
        <div className="p-6">
            <div className="max-w-md mx-auto mb-4">
                <button
                    onClick={handleDownload}
                    className="mt-3 w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Download PDF
                </button>
            </div>
        </div>
    );
};

export default StudentPdf;
