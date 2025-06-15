import Image from "next/image";
import React from "react";

export default function VideoBlock() {
    return (
        <section className="laptop-video-section section-margin">
            <div className="container">
                <div className="laptop-wrap position-relative mx-auto">
                    <Image
                        src={`/images/laptop.png`}
                        fill
                        style={{ objectFit: 'contain' }}
                        alt="Laptop"
                    />
                    <div className="laptop-video position-absolute">
                        <iframe
                            width="100%"
                            height="100%"
                            src="https://player.vimeo.com/video/861337942?autoplay=1&autoplay=0&loop=0&muted=1&background=0&autopause=1&title=0"
                            title="Embedded Video"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            </div>
        </section>
    );
}
