---
title: Home Labbing
tags: [projects]
image: /content/images/2026/05/image-1.png
excerpt: "To start this off I had no clue what I was doing... this is just me rambling about my experience on personal projects that I enjoy!"
---
To start this off I had no clue what I was doing... This is just me rambling about my experience on personal projects that I enjoy! A lot of reading, a lot of typos lol so enjoy.

This project of mine consists of several key points I wanted to target. System architecture, administration, network, and cybersecurity. I will break down exactly what I have done and my learning journey. First lets start off with the basics, hardware!

<div class="kg-card kg-toggle-card" data-kg-toggle-state="close">
  <div class="kg-toggle-heading">
    <h4 class="kg-toggle-heading-text">Server 01:</h4>
    <button class="kg-toggle-card-icon" aria-label="Expand toggle to read content">
      <svg id="Regular" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path class="cls-1" d="M23.25,7.311,12.53,18.03a.749.749,0,0,1-1.06,0L.75,7.311"></path></svg>
    </button>
  </div>
  <div class="kg-toggle-content">
    <p>DELL POWEREDGE R630 8 x 2.5'' | 2X E5-2680V4 128GB RAM IDRAC ENT &amp; NDC 495W PSU - No longer available im sure.</p>
    <p><a href="https://www.amazon.com/dp/B08QBJ2YMG?ref=ppx_yo2ov_dt_b_fed_asin_title&th=1">2x Samsung 870 EVO SSD 1tB</a></p>
    <p><a href="https://www.amazon.com/dp/B07H2RR55Q?ref=ppx_yo2ov_dt_b_fed_asin_title&th=1">2x Seagate BarraCuda 2TB Internal Hard Drive HDD – 3.5 Inch SATA 6Gb/s 7200 RPM 256MB Cache</a></p>
  </div>
</div>

<div class="kg-card kg-toggle-card" data-kg-toggle-state="close">
  <div class="kg-toggle-heading">
    <h4 class="kg-toggle-heading-text">Server 02:</h4>
    <button class="kg-toggle-card-icon" aria-label="Expand toggle to read content">
      <svg id="Regular" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path class="cls-1" d="M23.25,7.311,12.53,18.03a.749.749,0,0,1-1.06,0L.75,7.311"></path></svg>
    </button>
  </div>
  <div class="kg-toggle-content">
    <p>HP SSD S700 2.5" 500GB SATA III</p>
    <p><a href="https://www.amazon.com/dp/B09CGZKHGR?ref=ppx_yo2ov_dt_b_fed_asin_title&th=1">Thermalright AXP90 X36 Black Low Profile CPU Cooler</a></p>
  </div>
</div>

I began first with a dell office desktop... 16GB of ram, slow CPU no GPU but got the job done! I was able to install Proxmox on it and begin experimenting! Unfortunately, I never documented during that time as I was in school and working help desk :). However, it was the gateway to my new drug, HOME LABBING.

Moving on...

I then purchased the first server, Dell Power Edge R630. Huge leap and poor financial decisions! The server was relatively cheap for the amount of RAM I got. Electricity? Not so much. I began playing with Idrac, raiding, and server maintenance. I dabbled with all the configurations you could set and broke the server a lot.

First big boo boo I learned from DATA BACKUPS. Sorry to my GF due to me loosing several Minecraft servers I was self hosting (more on that in another section). Due to where I lived, we were often hit with power outages. Thus comes in the UPS (Uninterruptible Power Supply), giving me a few hours to safely shutdown my servers before data loss. Not to mention I had ONE 1tb HDD which when reading and writing to the drive does not like being interrupted LOL.

[UPS - CyberPower CP1500PFCLCD](https://www.amazon.com/dp/B00429N19W?ref=ppx_yo2ov_dt_b_fed_asin_title&th=1)

Boom, 1 enterprise lvl server, UPS and 2 1tb SSDs later. I had data backups and protections in place to help me with failures! Time to expand! I began small, setting up security tools. Wazuh for a SIEM, nessus for vuln scanning, kali linux for playing around, ubuntu server (docker) for hosting gaming servers and this website! It wasnt enough... Doing more research I saw other people setting up gaming and media servers and I was envious, I wanted more.

As any other tech "enthusiast" I have a bunch of spare parts. Ripping an old gaming pc to shreds, I now have a GPU! With no other parts besides a CPU for a working PC! So... I went on PC Part Picker. Looked up parts that worked for what I had without breaking the bank. Oh yea! I bought a 60 server rack so I bought a chassis, then bought my parts:

[4U rackmount Server](https://www.amazon.com/dp/B0D4NS6R41?ref=ppx_yo2ov_dt_b_fed_asin_title) — LIST OTHER PARTS RICKY

Now, I own 2 servers which consume electricity and make noise in my room like no other! That's enough of me yapping, I want to break down the specifics. Things will get more technical and some may question my understanding of these technologies. I do too but I'm learning.

<div class="kg-card kg-toggle-card" data-kg-toggle-state="close">
  <div class="kg-toggle-heading">
    <h4 class="kg-toggle-heading-text">Network Topology</h4>
    <button class="kg-toggle-card-icon" aria-label="Expand toggle to read content">
      <svg id="Regular" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path class="cls-1" d="M23.25,7.311,12.53,18.03a.749.749,0,0,1-1.06,0L.75,7.311"></path></svg>
    </button>
  </div>
  <div class="kg-toggle-content">
    <p>Understanding the topology, follow me for a moment. Again this project is very diverse.</p>
    <p>Main piece is my Hypervisor, Proxmox. By far the best and easiest to learn VM software out there. I have done my research...</p>
    <p>We need networking/security, I chose Opnsense (also Ntopng for visibility).</p>
    <p>EDR/SIEM going with Wazuh.</p>
    <p>Zero trust access with Twingate community edition.</p>
    <p>Docker often used with several self hosting projects: Portainer, Nginx Reverse proxy, SysReptor, Wordpress (not this server :) ), Crafty Controller.</p>
    <p>Nessus for vulnerability scanning. Unfortunately free version is limited and I prefer Wazuh's vulnerability detection.</p>
    <p>Media server, I went with Plex/arr technologies.</p>
    <p>For my data managing solution I chose TrueNAS.</p>
    <p>Cloudflare:</p>
  </div>
</div>

<figure class="kg-card kg-image-card kg-card-hascaption">
  <img src="/content/images/2026/05/image-1.png" class="kg-image" alt="" loading="lazy" width="1152" height="667" srcset="/content/images/size/w600/2026/05/image-1.png 600w, /content/images/size/w1000/2026/05/image-1.png 1000w, /content/images/2026/05/image-1.png 1152w" sizes="(min-width: 720px) 720px">
  <figcaption><strong>Topology</strong></figcaption>
</figure>
