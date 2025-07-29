import { Row, Col, Card, Skeleton } from "antd";
import './Loader.scss';

interface LoaderCardProps {
  count?: number; // Number of cards to render
}
interface CardLoaderProps {
  showBorder?: boolean; // Number of cards to render
}

// ✅ BarChartLoader component
const BarChartLoader = () => {
  return (
    <Card
    style={{
      height: 350,
      padding: "16px",
      boxShadow:
        "0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      marginBottom: 25
    }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        height: "100%",
        gap: 16,
        justifyContent: "center",
      }}
    >
      {[100, 150, 200, 160, 80, 200, 130, 110, 110].map((height, idx) => (
        <div
          key={idx}
          style={{
            width: 20,
            height,
            backgroundColor: "#e5e7eb",
            borderRadius: 6,
            animation: "pulse 1.5s infinite ease-in-out",
          }}
        />
      ))}
    </div>
  </Card>
  );
};

// ✅ PieChartLoader component
const PieChartLoader = () => {
  return (
    <div
      style={{
        width: 260,
        height: 260,
        borderRadius: "50%",
        background: "#e5e7eb",
        animation: "pulse 1.5s infinite ease-in-out",
      }}
    />
  );
};

const CardLoader = ({showBorder }: CardLoaderProps) => {
  return (
    <Row gutter={[16, 16]}>
      {[1, 2, 3, 4].map((_, idx) => (
        <Col xs={24} sm={12} md={6} key={idx}>
          <Card
            style={{
              borderRadius: 12,
              borderTop: showBorder
              ? `4px solid ${idx % 2 === 0 ? '#ef4444' : '#1e3a8a'}`
              : 'none',
              height: 160,
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
              marginBottom: 25
            }}
          >
            <Skeleton.Input
              active
              size="small"
              style={{ width: "60%", marginBottom: 12 }}
            />
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <Skeleton.Input
                active
                size="default"
                style={{ width: "70%" }}
              />
              <Skeleton.Avatar
                active
                shape="circle"
                size="small"
                style={{ marginLeft: 8 }}
              />
            </div>
            <Skeleton.Input
              active
              size="small"
              style={{ width: "40%", marginTop: 12 }}
            />
          </Card>
        </Col>
      ))}
    </Row>
  );
};

const TableLoader = () => {
  return (
    <Card
      style={{
        width: "100%",          // ✅ full width of parent
        borderRadius: 12,
        // marginTop: 25
      }}
    >
      <div style={{ width: "100%" }}>
        {Array.from({ length: 6 }).map((_, idx) => (
          <div
            key={idx}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px 16px",
              borderBottom: "1px solid #f0f0f0",
              width: "100%", // ✅ ensure each row is full width
              backgroundColor: "#fff",
            }}
          >
            <Skeleton.Input active size="small" style={{ width: "20%" }} />
            <Skeleton.Input active size="small" style={{ width: "30%" }} />
            <Skeleton.Input active size="small" style={{ width: "25%" }} />
            <Skeleton.Input active size="small" style={{ width: "15%" }} />
          </div>
        ))}
      </div>
    </Card>
  );
};

const LoaderCard = ({ count = 3 }: LoaderCardProps) => {
  const cardPlaceholders = Array.from({ length: count });

  const getColSpan = (count: number) => {
    if (count === 2) return { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 };
    if (count === 3) return { xs: 24, sm: 12, md: 8, lg: 8, xl: 8 };
    return { xs: 24 };
  };;

  return (
    <Row
      gutter={[24, 24]}
      justify={count === 2 ? "center" : "start"}
      style={{
        width: "100%",
        maxWidth: 1200,
        margin: "0 auto",
        // padding: count === 2 ? "12px px " : "12px",
        padding: "12px",
      }}
    >
      {cardPlaceholders.map((_, idx) => (
        <Col className="cls-card-loader" key={idx} {...getColSpan(count)}>
          <Card
            style={{
              borderRadius: 12,
              minHeight: 320,
              width: "100%",
              padding: 20,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
            }}
          >
            {/* Top Section */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {/* High */}
              <Skeleton.Input
                active
                style={{
                  width: "70%",
                  height: 32,
                  borderRadius: 6,
                }}
              />

              {/* Mid */}
              <Skeleton.Input
                active
                style={{
                  width: "50%",
                  height: 24,
                  borderRadius: 6,
                }}
              />

              {/* Low */}
              <Skeleton.Input
                active
                style={{
                  width: "30%",
                  height: 20,
                  borderRadius: 6,
                }}
              />
            </div>

            {/* Divider */}
            <div
              style={{
                height: 1,
                backgroundColor: "#f0f0f0",
                margin: "16px 0",
              }}
            />

            {/* Bottom Section - Label rows */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[80, 70, 60].map((w, i) => (
                <Skeleton.Input
                  key={i}
                  active
                  style={{
                    width: `${w}%`,
                    height: 18,
                    borderRadius: 4,
                  }}
                />
              ))}
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
};
const SkeletonSpenderCard = () => {
  return (
    <div
      style={{
        backgroundColor: '#fff',         // overall white background
        minHeight: '100vh',              // full viewport height
        padding: '40px 16px',            // spacing
        display: 'flex',
        justifyContent: 'center',
        borderRadius:"10px",
        marginBottom: 25
      }}
    >
      <div style={{ width: '100%', maxWidth: 800 }}>
        <div style={{ marginTop: 24 }}>
          {[1, 2, 3, 4].map((index) => (
            <Card key={index} style={{ marginBottom: 16 }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  flexWrap: 'wrap',
                  gap: 16,
                }}
              >
                <div style={{ flex: 1, minWidth: '60%' }}>
                  <Skeleton
                    active
                    paragraph={{ rows: 2, width: ['60%', '80%'] }}
                    title={{ width: '50%' }}
                  />
                </div>
                <div style={{ minWidth: 100, textAlign: 'right' }}>
                  <Skeleton.Button active style={{ width: 60, height: 24, marginBottom: 8 }} />
                  <br />
                  <Skeleton.Input active style={{ width: 100, height: 20 }} />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

const DepartmentSkeleton = () => {
  const skeletonRows = [1, 2, 3, 4, 5];

  return (
    <div
      style={{
        backgroundColor: '#fff',
        padding: '40px 16px',
        display: 'flex',
        justifyContent: 'center',
        borderRadius:"10px",
        marginBottom: 25,
        border: '1px solid #d9d9d9'
      }}
    >
      <div style={{ width: '100%', maxWidth: 800 }}>
        {/* <Title level={3}>Department Spending Breakdown</Title>
        <Text type="secondary">Detailed analysis of departmental travel expenses</Text> */}

        <div style={{ marginTop: 32 }}>
          {skeletonRows.map((_, index) => (
            <div
              key={index}
              style={{
                marginBottom: 32,
              }}
            >
              {/* Row layout */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  flexWrap: 'wrap',
                  gap: 16,
                }}
              >
                <Skeleton.Input active style={{ width: 120, height: 20 }} />
              </div>

              {/* Fake progress bar */}
              <div
                style={{
                  backgroundColor: '#f0f0f0',
                  height: 10,
                  borderRadius: 6,
                  overflow: 'hidden',
                  marginTop: 10,
                }}
              >
                <div>
                <Skeleton.Input active style={{ width: 800, height: 20, marginBottom: 6 }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const RecommendationSkeleton = () => {
  const recommendations = [1, 2, 3]; // You can map more if needed

  return (
    <div
      style={{
        background: '#fff',
        padding: '32px 24px',
        borderRadius: 8,
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
      }}
    >
      {/* <Title level={4}>AI Recommendations</Title>
      <Text type="secondary">Smart suggestions based on vendor performance analysis</Text> */}

      <div style={{ marginTop: 24 }}>
        {recommendations.map((_, index) => (
          <Card
            key={index}
            bordered
            style={{
              marginBottom: 16,
              borderLeft: '5px solid #1677ff',
              borderRadius: 8,
            }}
            bodyStyle={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}
          >
            {/* Icon Placeholder */}
            <Skeleton.Avatar active shape="circle" size="large" />

            {/* Content Block */}
            <div style={{ flex: 1 }}>
              <Skeleton.Input active style={{ width: '40%', marginBottom: 8 }} />
              <Skeleton paragraph={{ rows: 2, width: ['100%', '80%'] }} active />
              <Skeleton.Input active style={{ width: 120, marginTop: 8, height: 16 }} />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

// ✅ DashboardLoader component that uses the above two
const DashboardLoader = () => {
  return (
    <>
    <Row gutter={24}>
      {/* Vertical Bar Chart Loader */}
      <Col xs={24} lg={12}>
         <BarChartLoader />
      </Col>

      {/* Enlarged Pie Chart Loader */}
      <Col xs={24} lg={12}>
        <Card
          style={{
            height: 350,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow:
              "0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)",
          }}
        >
          <PieChartLoader />
        </Card>
      </Col>
    </Row>
    </>
  );
};

// ✅ Export all components (named)
export { BarChartLoader, PieChartLoader,CardLoader, TableLoader, LoaderCard,SkeletonSpenderCard,DepartmentSkeleton,RecommendationSkeleton, DashboardLoader };

// ✅ OR export default if you only care about DashboardLoader by default
// export default DashboardLoader;
