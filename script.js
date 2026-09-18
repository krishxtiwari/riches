/* =========================================================
   INITIALIZE ICONS
========================================================= */

lucide.createIcons();


/* =========================================================
   NAVBAR
========================================================= */

const navbar =
    document.getElementById("navbar");

window.addEventListener("scroll", () => {

    if (!navbar) return;

    if (window.scrollY > 70) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

});


/* =========================================================
   MOBILE MENU
========================================================= */

const openMenu =
    document.getElementById("openMenu");

const closeMenu =
    document.getElementById("closeMenu");

const mobileMenu =
    document.getElementById("mobileMenu");


if (openMenu && mobileMenu) {

    openMenu.addEventListener("click", () => {

        mobileMenu.classList.add("active");

        document.body.classList.add("no-scroll");

    });

}


if (closeMenu && mobileMenu) {

    closeMenu.addEventListener("click", () => {

        mobileMenu.classList.remove("active");

        document.body.classList.remove("no-scroll");

    });

}


/* Close menu after clicking link */

document
    .querySelectorAll(".mobile-menu a")
    .forEach(link => {

        link.addEventListener("click", () => {

            if (mobileMenu) {

                mobileMenu.classList.remove("active");

            }

            document.body.classList.remove("no-scroll");

        });

    });


/* =========================================================
   PROPERTY SEARCH
========================================================= */

const searchButton =
    document.getElementById("searchButton");

const locationSelect =
    document.getElementById("locationSelect");

const typeSelect =
    document.getElementById("typeSelect");

const purposeSelect =
    document.getElementById("purposeSelect");

const priceSelect =
    document.getElementById("priceSelect");

const bedroomsSelect =
    document.getElementById("bedroomsSelect");


if (searchButton) {

    searchButton.addEventListener("click", () => {

        const searchData = {

            location:
                locationSelect?.value || "",

            propertyType:
                typeSelect?.value || "",

            purpose:
                purposeSelect?.value || "",

            budget:
                priceSelect?.value || "",

            bedrooms:
                bedroomsSelect?.value || ""

        };


        const hasSearch =
            Object.values(searchData)
                .some(value => value !== "");


        if (!hasSearch) {

            alert(
                "Please select at least one search preference."
            );

            return;

        }


        /*
            Save search locally.

            This can later be connected
            directly to a property database
            or CRM.
        */

        sessionStorage.setItem(
            "richesmakerPropertySearch",
            JSON.stringify(searchData)
        );


        alert(

            `Property Search\n\n` +

            `Location: ${
                searchData.location || "Any"
            }\n` +

            `Property Type: ${
                searchData.propertyType || "Any"
            }\n` +

            `Purpose: ${
                searchData.purpose || "Any"
            }\n` +

            `Budget: ${
                searchData.budget || "Any"
            }\n` +

            `Bedrooms: ${
                searchData.bedrooms || "Any"
            }`

        );

    });

}


/* =========================================================
   RESTORE PREVIOUS SEARCH
========================================================= */

const savedSearch =
    sessionStorage.getItem(
        "richesmakerPropertySearch"
    );


if (savedSearch) {

    try {

        const data =
            JSON.parse(savedSearch);


        const fields = {

            locationSelect:
                data.location,

            typeSelect:
                data.propertyType,

            purposeSelect:
                data.purpose,

            priceSelect:
                data.budget,

            bedroomsSelect:
                data.bedrooms

        };


        Object.entries(fields)
            .forEach(([id, value]) => {

                const element =
                    document.getElementById(id);

                if (
                    element &&
                    value
                ) {

                    element.value = value;

                }

            });


    } catch (error) {

        console.log(
            "Could not restore search."
        );

    }

}


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(
        `
        .approach-content,
        .expertise-item,
        .property-card,
        .location-category,
        .journal-grid article,
        .why-points > div
        `
    );


revealElements.forEach(element => {

    element.classList.add("reveal");

});


const revealObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting
                ) {

                    entry.target.classList.add(
                        "visible"
                    );

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },

        {
            threshold: 0.12
        }

    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =========================================================
   HERO PARALLAX
========================================================= */

const heroImage =
    document.querySelector(
        ".hero-image"
    );


window.addEventListener(
    "scroll",
    () => {

        if (!heroImage) return;


        const scroll =
            window.scrollY;


        if (
            scroll <
            window.innerHeight
        ) {

            heroImage.style.transform =
                `translateY(${scroll * 0.08}px) scale(1.02)`;

        }

    }
);


/* =========================================================
   INVESTMENT CALCULATOR
========================================================= */

const calculateButton =
    document.getElementById(
        "calculateInvestment"
    );


const purchasePrice =
    document.getElementById(
        "purchasePrice"
    );


function formatIndianCurrency(value) {

    return "₹" +
        Number(value).toLocaleString(
            "en-IN",
            {
                maximumFractionDigits: 0
            }
        );

}


function calculateInvestment() {

    const price =
        parseFloat(
            purchasePrice?.value
        );


    if (
        !price ||
        price <= 0
    ) {

        alert(
            "Please enter a purchase price."
        );

        return;

    }


    const stampDuty =
        parseFloat(
            document.getElementById(
                "stampDuty"
            )?.value
        ) || 0;


    const registration =
        parseFloat(
            document.getElementById(
                "registration"
            )?.value
        ) || 0;


    const brokerage =
        parseFloat(
            document.getElementById(
                "brokerage"
            )?.value
        ) || 0;


    const otherCosts =
        parseFloat(
            document.getElementById(
                "otherCosts"
            )?.value
        ) || 0;


    const rentalYield =
        parseFloat(
            document.getElementById(
                "rentalYield"
            )?.value
        ) || 0;


    const appreciation =
        parseFloat(
            document.getElementById(
                "appreciation"
            )?.value
        ) || 0;


    const holdingPeriod =
        parseFloat(
            document.getElementById(
                "holdingPeriod"
            )?.value
        ) || 1;


    /*
        Additional acquisition costs
    */

    const additionalPercentage =
        (
            stampDuty +
            registration +
            brokerage
        ) / 100;


    const totalInvestment =
        (
            price *
            (1 + additionalPercentage)
        ) +
        otherCosts;


    /*
        Projected property value
    */

    const projectedValue =
        price *
        Math.pow(
            1 + appreciation / 100,
            holdingPeriod
        );


    /*
        Estimated capital ROI
    */

    const estimatedROI =
        (
            (
                projectedValue -
                totalInvestment
            ) /
            totalInvestment
        ) *
        100;


    /*
        Update results
    */

    const totalElement =
        document.getElementById(
            "totalInvestment"
        );


    const projectedElement =
        document.getElementById(
            "projectedValue"
        );


    const roiElement =
        document.getElementById(
            "estimatedROI"
        );


    if (totalElement) {

        totalElement.textContent =
            formatIndianCurrency(
                totalInvestment
            );

    }


    if (projectedElement) {

        projectedElement.textContent =
            formatIndianCurrency(
                projectedValue
            );

    }


    if (roiElement) {

        roiElement.textContent =
            estimatedROI.toFixed(1) +
            "%";

    }

}


if (calculateButton) {

    calculateButton.addEventListener(
        "click",
        calculateInvestment
    );

}


/* =========================================================
   LEAD FORM
========================================================= */

const leadForm = document.getElementById("leadForm");

if (leadForm) {

    leadForm.addEventListener("submit", event => {

        // Allow FormSubmit to receive the form
        // and send it to info@richesmaker.com.
        // No WhatsApp redirect.

    });

}

/* =========================================================
   PROPERTY CARD INTERACTION
========================================================= */

document
    .querySelectorAll(
        ".property-card"
    )
    .forEach(card => {

        card.addEventListener(
            "click",
            event => {

                if (
                    event.target.closest(
                        "a, button"
                    )
                ) {

                    return;

                }


                const title =
                    card
                        .querySelector("h3")
                        ?.textContent
                        .trim();


                if (title) {

                    sessionStorage.setItem(
                        "richesmakerSelectedProperty",
                        title
                    );

                }

            }
        );

    });


/* =========================================================
   LOCATION INTERACTION
========================================================= */

document
    .querySelectorAll(
        ".location-category"
    )
    .forEach(card => {

        card.style.cursor =
            "pointer";


        card.addEventListener(
            "click",
            () => {

                const location =
                    card
                        .querySelector("span")
                        ?.textContent
                        .trim();


                if (location) {

                    sessionStorage.setItem(
                        "richesmakerSelectedLocation",
                        location
                    );

                }

            }
        );

    });


/* =========================================================
   SMOOTH ANCHOR HANDLING
========================================================= */

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetID =
                    link.getAttribute(
                        "href"
                    );


                if (
                    !targetID ||
                    targetID === "#"
                ) {

                    return;

                }


                const target =
                    document.querySelector(
                        targetID
                    );


                if (!target) {

                    return;

                }


                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    });


/* =========================================================
   RE-INITIALIZE ICONS
========================================================= */

lucide.createIcons();



/* =========================================================
   INVESTMENT CALCULATOR
========================================================= */

function calculateInvestment() {

    const purchasePrice =
        parseFloat(document.getElementById("purchasePrice").value) || 0;

    const propertyStatus =
        document.getElementById("propertyStatus").value;

    const stampDutyRate = 0.06;

    let gstRate = 0;

    /*
        GST:
        Under Construction = 5%
        Ready to Move In   = 0%
        Resale             = 0%
    */

    if (propertyStatus === "under") {
        gstRate = 0.05;
    }

    const stampDuty = purchasePrice * stampDutyRate;

    const gst = purchasePrice * gstRate;

    const totalCost =
        purchasePrice + stampDuty + gst+40000;


    document.getElementById("stampDutyAmount").textContent =
        formatIndianCurrency(stampDuty);


    document.getElementById("gstAmount").textContent =
        formatIndianCurrency(gst);
        
        document.getElementById("registrationAmount").textContent =
    formatIndianCurrency(40000);



    document.getElementById("totalCost").textContent =
        formatIndianCurrency(totalCost);


    if (propertyStatus === "under") {

        document.getElementById("gstRate").textContent =
            "5% applicable";

    } else {

        document.getElementById("gstRate").textContent =
            "0% applicable";

    }

}


/* =========================================================
   EMI CALCULATOR
========================================================= */

function calculateEMI() {

    const loanAmount =
        parseFloat(document.getElementById("loanAmount").value) || 0;

    const annualInterest =
        parseFloat(document.getElementById("interestRate").value) || 0;

    const years =
        parseFloat(document.getElementById("loanTenure").value) || 0;


    if (loanAmount <= 0 || annualInterest <= 0 || years <= 0) {

        document.getElementById("monthlyEMI").textContent = "₹0";

        document.getElementById("totalInterest").textContent = "₹0";

        document.getElementById("totalPayment").textContent = "₹0";

        return;

    }


    const monthlyInterest =
        annualInterest / 12 / 100;

    const numberOfPayments =
        years * 12;


    /*
        EMI Formula:

        EMI = P × R × (1 + R)^N
              -----------------
              (1 + R)^N - 1
    */

    const emi =
        loanAmount *
        monthlyInterest *
        Math.pow(
            1 + monthlyInterest,
            numberOfPayments
        ) /
        (
            Math.pow(
                1 + monthlyInterest,
                numberOfPayments
            ) - 1
        );


    const totalPayment =
        emi * numberOfPayments;


    const totalInterest =
        totalPayment - loanAmount;


    document.getElementById("monthlyEMI").textContent =
        formatIndianCurrency(emi);


    document.getElementById("totalInterest").textContent =
        formatIndianCurrency(totalInterest);


    document.getElementById("totalPayment").textContent =
        formatIndianCurrency(totalPayment);

}


/* =========================================================
   INDIAN CURRENCY FORMAT
========================================================= */

function formatIndianCurrency(amount) {

    return "₹" + Math.round(amount).toLocaleString("en-IN");

}
/* =========================================================
   EMI CALCULATOR BUTTON
========================================================= */

const emiCalculateButton =
    document.getElementById("calculateEMI");

if (emiCalculateButton) {

    emiCalculateButton.addEventListener(
        "click",
        calculateEMI
    );

}