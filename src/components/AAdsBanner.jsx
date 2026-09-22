export default function AAdsBanner() {
  return (
    <div
      id="frame"
      style={{
        width: "100%",
        margin: "auto",
        position: "relative",
        zIndex: 99998,
      }}
    >
      <iframe
        data-aa="2456051"
        src="//acceptable.a-ads.com/2456051/?size=Adaptive"
        title="Advertisement"
        style={{
          border: 0,
          padding: 0,
          width: "70%",
          height: "auto",
          overflow: "hidden",
          display: "block",
          margin: "auto",
        }}
      />
      <div
        style={{
          width: "70%",
          margin: "auto",
          position: "absolute",
          left: 0,
          right: 0,
        }}
      >
        <a
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            fontSize: "13px",
            color: "#263238",
            padding: "4px 10px",
            background: "#F8F8F9",
            textDecoration: "none",
            borderRadius: "0 0 4px 4px",
          }}
          id="frame-link"
          href="https://aads.com/campaigns/new/?source_id=2456051&source_type=ad_unit&partner=2456051"
        >
          Advertise here
        </a>
      </div>
    </div>
  );
}
