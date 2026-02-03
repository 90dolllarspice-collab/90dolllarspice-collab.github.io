
import React from 'react';
import './GoalSection.css';

const GoalSection: React.FC = () => {
  return (
    <main className="whr-structured" id="intake">
      <div className="whr-structured-wrap">
        <p className="kicker">Wiring Harness Restoration • When incompetence finds a business model.™</p>

        <section className="warning">
          <h2 className="warning__title">Goal Of This Site</h2>

          <div className="warning__content">
            <p>
              The sole purpose of this site is to warn potential future customers about a scheme crafted by a Utah resident named Darren Flint. He operates a business called <strong>Wiring Harness Restoration</strong>, which is designed around taking possession of one-of-a-kind or rare items, such as automotive wiring harnesses.
            </p>

            <p>
              He claims to restore these harnesses using a process he calls <q>deoxidation</q>, which is supposedly intended to restore wire conductivity and somehow bring the harnesses back to life.
            </p>

            <p className="warning__callout">
              This "deoxidation" process is entirely fabricated. It is not a real or recognized practice. Automotive wiring harnesses are not repaired by "deoxidizing" them, nor does anyone solder pins back onto harnesses in the manner implied.
            </p>

            <p>
              The purpose of inventing this so-called deoxidation process is to introduce an unknown and unverifiable variable into the work. It provides a convenient explanation for excessively long timelines, since no customer can independently verify whether this process is occurring. There is no established standard for it.
            </p>

            <p>
              Because the business is marketed as "restoration," he can claim that customers are paying specifically for this undefined process and argue that if it takes up to two years to "deoxidize" a harness, it is beyond his control—asserting that this is what the customer agreed to.
            </p>

            <p>
              Customers typically enter into this arrangement believing they are paying for a repair. His website strongly implies that this is the service being offered, but that is not the reality. Early on, he suggests the work may take only a few weeks and performs the initial inspection very quickly, often within days.
            </p>

            <p>
              However, once the customer signs the contract—containing language buried in the middle that allows the process to take up to two years—they are bound by terms they would not reasonably expect from a company that was able to provide a prompt inspection and estimate.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default GoalSection;
