// declare var jsPDF: any; // Declare jsPDF if using global script inclusion
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// Define the generateResume function (Ensure it is declared only once)
function generateResume() {
    var _a;
    (_a = document.getElementById('resumeForm')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', function (event) {
        var _this = this;
        var _a;
        event.preventDefault();
        // Get form values
        var profilePicture = document.getElementById('profilePicture');
        var name = document.getElementById('name').value;
        var email = document.getElementById('email').value;
        var phone = document.getElementById('phone').value;
        var education = document.getElementById('education').value;
        var experience = document.getElementById('experience').value;
        var skills = document.getElementById('skills').value;
        // ------------------------------
        var usernameElement = document.getElementById("username");
        // Get the profile picture file
        var profilePictureFile = (_a = profilePicture.files) === null || _a === void 0 ? void 0 : _a[0];
        var profilePictureURL = profilePictureFile ? URL.createObjectURL(profilePictureFile) : "";
        // Create resume output HTML
        var resumeOutput = "\n            <h2>Resume</h2>\n            ".concat(profilePictureURL ? "<img src=\"".concat(profilePictureURL, "\" alt=\"profile Picture\" class=\"profilePicture\">") : "", "\n            <p><strong>First Name:</strong> ").concat(name, "</p>\n            <p><strong>Second Name:</strong> ").concat(name, "</p> <!-- Consider using a separate second name field -->\n            <p><strong>Email Address:</strong> ").concat(email, "</p>\n            <p><strong>Phone Number:</strong> ").concat(phone, "</p>\n            <h2>Education</h2>\n            <p>").concat(education, "</p>\n            <h2>Experience</h2>\n            <p>").concat(experience, "</p>\n            <h2>Skills</h2>\n            <p>").concat(skills, "</p>\n        ");
        var username = usernameElement.value;
        var uniquePath = "resumes/".concat(username.replace(/\s+/g, '_'), "_cv.html");
        var donwloadLink = document.createElement('a');
        donwloadLink.href = 'data:text/html;charset=utf-8,' + encodeURIComponent(resumeOutput);
        donwloadLink.download = uniquePath;
        donwloadLink.textContent = 'Download Your 2024 Resume';
        var resumeOutputElement = document.getElementById('resumeOutput');
        if (resumeOutputElement) {
            resumeOutputElement.innerHTML = resumeOutput;
            resumeOutputElement.appendChild(donwloadLink);
        }
        else {
            console.error('The resume output element is missing');
        }
        // Create buttons for PDF download and shareable link
        var buttonsContainer = document.createElement("div");
        buttonsContainer.id = "buttonsContainer";
        resumeOutputElement === null || resumeOutputElement === void 0 ? void 0 : resumeOutputElement.appendChild(buttonsContainer);
        // Add download PDF button
        var donwloadButton = document.createElement("button");
        donwloadButton.textContent = "Download as PDF";
        donwloadButton.addEventListener("click", function () {
            var doc = new jsPDF();
            // Add content to PDF (basic example, you can modify it)
            doc.html(resumeOutputElement, {
                callback: function (doc) {
                    doc.save("".concat(username.replace(/\s+/g, '_'), "_resume.pdf"));
                },
                margin: [10, 10, 10, 10],
                x: 10,
                y: 10,
            });
        });
        buttonsContainer.appendChild(donwloadButton);
        // Add shareable link button
        var shareLinkButton = document.createElement("button");
        shareLinkButton.textContent = "Copy Shareable Link";
        shareLinkButton.addEventListener("click", function () { return __awaiter(_this, void 0, void 0, function () {
            var shareLink, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        shareLink = "http://yourdomain.com/resume/".concat(name.replace(/\s+/g, "_"), "_cv.html");
                        return [4 /*yield*/, navigator.clipboard.writeText(shareLink)];
                    case 1:
                        _a.sent();
                        alert("Shareable link copied to clipboard");
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        console.error("Failed to copy link: ", err_1);
                        alert("Failed to copy link to clipboard. Please try again.");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        buttonsContainer.appendChild(shareLinkButton);
    });
}
// Now the event listener can call this function only once
document.addEventListener('DOMContentLoaded', generateResume);
