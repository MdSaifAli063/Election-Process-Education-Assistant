import React from 'react';
import { MapPin, Navigation } from 'lucide-react';

export const PollingLocator = () => {
  return (
    <section className="section polling-locator reveal" aria-labelledby="locator-heading">
      <div className="container">
        <div className="section-header">
          <span className="badge badge-primary">Google Maps Integration</span>
          <h2 id="locator-heading" className="text-heading section-header__title">
            Find Your Polling Station
          </h2>
          <p className="section-header__subtitle">Locate your nearest voting booth instantly using our interactive map tool.</p>
        </div>

        <div className="locator-card card">
          <div className="locator-card__map">
            <iframe 
              title="Polling Station Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.142293761321!2d-73.98731968459391!3d40.75889497932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480293%3A0x51b3fc13c322b64d!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1625501234567!5m2!1sen!2sus"
              width="100%" 
              height="450" 
              style={{ border: 0, borderRadius: 'var(--radius-lg)' }} 
              allowFullScreen="" 
              loading="lazy"
            ></iframe>
          </div>
          <div className="locator-card__info">
            <div className="locator-card__search">
              <input type="text" placeholder="Enter your zipcode or city..." className="maps-input" />
              <button className="btn btn-primary"><Navigation size={18} /> Locate Me</button>
            </div>
            <div className="locator-card__results">
              <div className="locator-item">
                <MapPin className="text-primary" />
                <div>
                  <h6>Central Library Booth #4</h6>
                  <p>123 Democracy Lane, Civic Center</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
