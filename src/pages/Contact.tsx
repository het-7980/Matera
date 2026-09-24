import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import Media from "../components/Media";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import { company } from "../data/company";
import { images } from "../data/images";
import "./Contact.css";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk material."
        description="For catalogue requests, sample specification or project enquiries, reach the studio directly or send a message below."
      />

      <section className="container contact-grid">
        <Reveal className="contact-info">
          <div className="contact-info-item">
            <Mail size={18} strokeWidth={1.4} />
            <div>
              <span className="eyebrow">Email</span>
              <a href={`mailto:${company.email}`}>{company.email}</a>
            </div>
          </div>
          <div className="contact-info-item">
            <Phone size={18} strokeWidth={1.4} />
            <div>
              <span className="eyebrow">Phone</span>
              <a href={`tel:${company.phone.replace(/[^+\d]/g, "")}`}>{company.phone}</a>
            </div>
          </div>
          <div className="contact-info-item">
            <MapPin size={18} strokeWidth={1.4} />
            <div>
              <span className="eyebrow">Studio</span>
              <span>{company.address}</span>
            </div>
          </div>

          <div className="contact-map">
            <Media tone="concrete" src={images.facadeCurved} alt="Matera studio building" sizes="(max-width: 800px) 100vw, 40vw" ratio="4 / 3" />
          </div>
        </Reveal>

        <Reveal delay={0.1} className="contact-form-wrap">
          {submitted ? (
            <div className="contact-success">
              <h3>Thank you.</h3>
              <p>Your enquiry has been received. A member of the Matera team will respond shortly.</p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="contact-form-row">
                <label>
                  Name
                  <input type="text" name="name" required />
                </label>
                <label>
                  Email
                  <input type="email" name="email" required />
                </label>
              </div>
              <div className="contact-form-row">
                <label>
                  Company / Studio
                  <input type="text" name="company" />
                </label>
                <label>
                  Interest
                  <select name="interest" defaultValue="">
                    <option value="" disabled>Select an option</option>
                    <option>Catalogue Request</option>
                    <option>Sample Specification</option>
                    <option>Project Enquiry</option>
                    <option>General Question</option>
                  </select>
                </label>
              </div>
              <label>
                Message
                <textarea name="message" rows={5} required />
              </label>
              <button type="submit" className="btn btn-filled">Send Enquiry</button>
            </form>
          )}
        </Reveal>
      </section>
    </>
  );
}
