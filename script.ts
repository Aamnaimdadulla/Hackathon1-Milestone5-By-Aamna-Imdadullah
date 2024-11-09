declare var jsPDF: any; // Declare jsPDF if using global script inclusion

// Define the generateResume function (Ensure it is declared only once)
function resume () {
    document.getElementById('resumeForm')?.addEventListener('submit', function(event) {
        event.preventDefault();

        // Get form values
        const profilePicture = document.getElementById('profilePicture') as HTMLInputElement;
        const name = (document.getElementById('name') as HTMLInputElement).value;    
        const email = (document.getElementById('email') as HTMLInputElement).value;
        const phone = (document.getElementById('phone') as HTMLInputElement).value;
        const education = (document.getElementById('education') as HTMLTextAreaElement).value;
        const experience = (document.getElementById('experience') as HTMLTextAreaElement).value;
        const skills = (document.getElementById('skills') as HTMLTextAreaElement).value;

        // ------------------------------
        const usernameElement = document.getElementById("username") as HTMLInputElement;

        // Get the profile picture file
        const profilePictureFile = profilePicture.files?.[0];
        const profilePictureURL = profilePictureFile ? URL.createObjectURL(profilePictureFile) : "";

        // Create resume output HTML
        const resumeOutput = `
            <h2>Resume</h2>
            ${profilePictureURL ? `<img src="${profilePictureURL}" alt="profile Picture" class="profilePicture">` : ""}
            <p><strong>First Name:</strong> ${name}</p>
            <p><strong>Second Name:</strong> ${name}</p> <!-- Consider using a separate second name field -->
            <p><strong>Email Address:</strong> ${email}</p>
            <p><strong>Phone Number:</strong> ${phone}</p>
            <h2>Education</h2>
            <p>${education}</p>
            <h2>Experience</h2>
            <p>${experience}</p>
            <h2>Skills</h2>
            <p>${skills}</p>
        `;

        const username = usernameElement.value;
        const uniquePath = `resumes/${username.replace(/\s+/g, '_')}_cv.html`;

        const donwloadLink = document.createElement('a');
        donwloadLink.href = 'data:text/html;charset=utf-8,' + encodeURIComponent(resumeOutput);
        donwloadLink.download = uniquePath;
        donwloadLink.textContent = 'Download Your 2024 Resume';

        const resumeOutputElement = document.getElementById('resumeOutput');
        if (resumeOutputElement) {
            resumeOutputElement.innerHTML = resumeOutput;
            resumeOutputElement.appendChild(donwloadLink);
        } else {
            console.error('The resume output element is missing');
        }

        // Create buttons for PDF download and shareable link
        const buttonsContainer = document.createElement("div");
        buttonsContainer.id = "buttonsContainer";
        resumeOutputElement?.appendChild(buttonsContainer);

        // Add download PDF button
        const donwloadButton = document.createElement("button");
        donwloadButton.textContent = "Download as PDF";
        donwloadButton.addEventListener("click", () => {
            const doc = new jsPDF();

            // Add content to PDF (basic example, you can modify it)
            doc.html(resumeOutputElement as HTMLElement, {
                callback: function (doc) {
                    doc.save(`${username.replace(/\s+/g, '_')}_resume.pdf`);
                },
                margin: [10, 10, 10, 10],
                x: 10,
                y: 10,
            });
        });

        buttonsContainer.appendChild(donwloadButton);

        // Add shareable link button
        const shareLinkButton = document.createElement("button");
        shareLinkButton.textContent = "Copy Shareable Link";
        shareLinkButton.addEventListener("click", async () => {
            try {
                const shareLink = `http://yourdomain.com/resume/${name.replace(/\s+/g, "_")}_cv.html`;
                await navigator.clipboard.writeText(shareLink);
                alert("Shareable link copied to clipboard");
            } catch (err) {
                console.error("Failed to copy link: ", err);
                alert("Failed to copy link to clipboard. Please try again.");
            }
        });
        buttonsContainer.appendChild(shareLinkButton);
    });
}

// Now the event listener can call this function only once
document.addEventListener('DOMContentLoaded', generateResume);
