import "@/index.css";
import { Toaster } from "@/components/ui/sonner";
import Script from "next/script";

export const viewport = {
  themeColor: "#0B3C5D",
};

export const metadata = {
  metadataBase: new URL("https://aurvyz.com"),
  title: "Aurvyz AI — AI Products & Automation for Modern Businesses",
  description: "Aurvyz AI — A product-driven AI automation company. We build AI products and custom software that help businesses grow faster and operate smarter with automation.",
  keywords: ["Aurvyz", "Aurvyz AI", "AI automation", "custom software development", "AI product studio", "business process automation", "enterprise AI solutions"],
  openGraph: {
    type: "website",
    url: "https://aurvyz.com/",
    siteName: "Aurvyz AI",
    title: "Aurvyz AI — AI Products & Automation for Modern Businesses",
    description: "Product-driven AI automation company. We design and build AI-powered operational systems and custom software to help businesses scale through intelligent automation.",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aurvyz AI — AI Products & Automation",
    description: "Product-driven AI automation company building the future of business through AI-powered systems.",
    images: ["/og-image.png"],
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
};

import { ThemeProvider } from "@/components/ThemeProvider";
import { CommandMenu } from "@/components/ui/CommandMenu";
import Clarity from "@/components/Clarity";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@500,600,700,800&f[]=satoshi@400,500,700,900&display=swap" rel="stylesheet" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Aurvyz AI",
              "url": "https://aurvyz.com/",
              "logo": "https://aurvyz.com/favicon.png",
              "description": "Aurvyz AI is a product-driven AI automation company building AI products and custom software that help businesses grow faster.",
              "contactPoint": {
                "@type": "ContactPoint",
                "email": "hello@aurvyz.com",
                "contactType": "customer service"
              }
            })
          }}
        />

        <Script id="ignore-perf" strategy="beforeInteractive">
          {`window.addEventListener("error",function(e){if(e.error instanceof DOMException&&e.error.name==="DataCloneError"&&e.message&&e.message.includes("PerformanceServerTiming")){e.stopImmediatePropagation();e.preventDefault()}},true);`}
        </Script>
        <Script src="https://assets.emergent.sh/scripts/emergent-main.js" strategy="afterInteractive" />
      </head>
      <body className="antialiased">
        <noscript>
          <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-M44VKRQP"
            height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}></iframe>
        </noscript>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div id="root">{children}</div>
          <CommandMenu />
          <Toaster position="top-right" />
          <Clarity />
        </ThemeProvider>

        <Script id="posthog" strategy="afterInteractive">
          {`
            !(function (t, e) {
                var o, n, p, r;
                e.__SV ||
                    ((window.posthog = e),
                    (e._i = []),
                    (e.init = function (i, s, a) {
                        function g(t, e) {
                            var o = e.split(".");
                            2 == o.length && ((t = t[o[0]]), (e = o[1])),
                                (t[e] = function () {
                                    t.push(
                                        [e].concat(
                                            Array.prototype.slice.call(
                                                arguments,
                                                0,
                                            ),
                                        ),
                                    );
                                });
                        }
                        ((p = t.createElement("script")).type =
                            "text/javascript"),
                            (p.crossOrigin = "anonymous"),
                            (p.async = !0),
                            (p.src =
                                s.api_host.replace(
                                    ".i.posthog.com",
                                    "-assets.i.posthog.com",
                                ) + "/static/array.js"),
                            (r =
                                t.getElementsByTagName(
                                    "script",
                                )[0]).parentNode.insertBefore(p, r);
                        var u = e;
                        for (
                            void 0 !== a ? (u = e[a] = []) : (a = "posthog"),
                                u.people = u.people || [],
                                u.toString = function (t) {
                                    var e = "posthog";
                                    return (
                                        "posthog" !== a && (e += "." + a),
                                        t || (e += " (stub)"),
                                        e
                                    );
                                },
                                u.people.toString = function () {
                                    return u.toString(1) + ".people (stub)";
                                },
                                o =
                                    "init me ws ys ps bs capture je Di ks register register_once register_for_session unregister unregister_for_session Ps getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSurveysLoaded onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey canRenderSurveyAsync identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty Es $s createPersonProfile Is opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing Ss debug xs getPageViewId captureTraceFeedback captureTraceMetric".split(
                                        " ",
                                    ),
                                n = 0;
                            n < o.length;
                            n++
                        )
                            g(u, o[n]);
                        e._i.push([i, s, a]);
                    }),
                    (e.__SV = 1));
            })(document, window.posthog || []);
            posthog.init("phc_xAvL2Iq4tFmANRE7kzbKwaSqp1HJjN7x48s3vr0CMjs", {
                api_host: "https://us.i.posthog.com",
                person_profiles: "identified_only",
                session_recording: {
                    recordCrossOriginIframes: true,
                    capturePerformance: false,
                },
            });
          `}
        </Script>

        {/* Google Analytics */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-Z6YFLNS5ZC" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-Z6YFLNS5ZC');
          `}
        </Script>
        {/* Google Ads */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=AW-18191561809" strategy="afterInteractive" />
        <Script id="google-ads" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-18191561809');
          `}
        </Script>

        {/* Microsoft Clarity */}
        <Script id="clarity-script" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "x09ry50skr");
          `}
        </Script>

        {/* Google Tag Manager */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-M44VKRQP');
          `}
        </Script>
      </body>
    </html>
  );
}
