import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { toast } from "react-toastify";

const Contact = ({ contact }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3030/send-email", {
        email,
        message,
      });

      if (response.status === 200) {
        toast.success('E-mail envoyé avec succès',{
          position:"top-right"
        })
      }
    } catch (error) {
      toast.error("Une erreur s'est produite",{
        position:"top-right"
      })  
    }
  };

  return (
    <div className="parent" ref={contact}>
      <div className="contact">
        <h1>Contactez - nous</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email :</Form.Label>
            <Form.Control
              type="email"
              placeholder="nom@exemple.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              as="textarea"
              rows={8}
              placeholder="Ecrivez votre message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control type="submit" value="Envoyer" />
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};

export default Contact;
