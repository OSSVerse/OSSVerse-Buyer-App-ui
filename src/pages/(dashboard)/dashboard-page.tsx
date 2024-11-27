import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Typography, { H3, Muted } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import CartIcon from "@/components/icons/cart-icon";
import OrderProgressIcon from "@/components/icons/order-progress-icon";
import { Badge } from "@/components/ui/badge";
import ExternalLinkIcon from "@/components/icons/external-link-icon";
import { BriefcaseBusiness } from "lucide-react";
import Icon from "@/components/common/icon";
import RequestProgressIcon from "@/components/icons/request-progress-icon";
import { useNavigate } from "react-router-dom";
import { currencyFormatter } from "@/lib/utils";

// Register the necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
);

export const StatsCard = ({
  title,
  value,
  icon,
  footer,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  footer: React.ReactNode;
}) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <div>
            <CardTitle className="font-bold text-xl ">{value}</CardTitle>
            <Typography muted className="text-lg">
              {title}
            </Typography>
          </div>
          <div>{icon}</div>
        </div>
      </CardHeader>

      <CardFooter className="mt-3">{footer}</CardFooter>
    </Card>
  );
};

// const FinancialStatsCard = () => {
//   const data = {
//     labels: Array.from({ length: 30 }, (_, i) => i + 1), // Assuming data for 30 days
//     datasets: [
//       {
//         label: 'Daily Spend',
//         data: [/* Array of daily spend values */],
//         fill: true,
//         backgroundColor: 'rgba(211, 211, 211, 0.5)',
//         borderColor: 'rgba(0, 0, 0, 0.1)',
//       }
//     ]
//   };

//   const options = {
//     scales: {
//       y: {
//         beginAtZero: true
//       }
//     },
//     plugins: {
//       legend: {
//         display: false
//       }
//     },
//     maintainAspectRatio: false
//   };

//   return (
//     <Card>
//       <CardContent>
//         <Typography className="text-lg font-bold">Spend (this month)</Typography>
//         <Typography className="text-2xl font-bold">₹120,250</Typography>
//         <Typography className="text-sm" muted>+2.5% from last month</Typography>
//         <div style={{ height: '100px' }}>
//           <Line data={data} options={options} />
//         </div>
//         <Typography className="text-lg font-bold mt-4">Total Revenue</Typography>
//         <Typography className="text-xl">₹1,322,330</Typography>
//       </CardContent>
//     </Card>
//   );
// }

export const OrdersCard = () => {
  const getOrderCard = (
    title: string,
    value: number,
    color: string,
    extraclass: string,
  ) => {
    return (
      <div className="flex-1 flex flex-col gap-2">
        <div className={`flex flex-col w-full ${color}  h-5 ${extraclass}`} />
        <Typography className="text-lg sm:text-2xl font-bold">
          {value}
        </Typography>
        <Typography className="text-xs whitespace-nowrap" muted>
          <ul className="ms-4 list-disc">
            <li>{title}</li>
          </ul>
        </Typography>
      </div>
    );
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Orders Completed</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          {getOrderCard("Projects", 19, "bg-[#CCC]", "rounded-l-full")}
          {getOrderCard("ML Models", 86, "bg-[#808080]", "mx-[2px]")}
          {getOrderCard(
            "On Demand Requests",
            28,
            "bg-[#4D4D4D]",
            "ml-1 rounded-r-full",
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export const OrdersInProgressCard = () => {
  const orders = [
    {
      name: "AutoSync Project",
      icons: ["search-alt"],
      assignedDaysAgo: 3,
      price: 1100,
      client: "OpenFort",
    },
    {
      name: "Lorem Project",
      icons: ["search-alt"],
      assignedDaysAgo: 1,
      price: 1100,
      client: "USE",
    },
    {
      name: "Lorem Project",
      icons: ["search-alt"],
      assignedDaysAgo: 1,
      price: 1100,
      client: "GreenHill",
    },
    {
      name: "Lorem Project",
      icons: ["search-alt"],
      assignedDaysAgo: 1,
      price: 1100,
      client: "Tocomo",
    },
  ];

  return (
    <Card className="mb-4">
      <CardHeader className="flex gap-2 flex-row items-center">
        <CardTitle>Orders In Progress</CardTitle>
        <Badge variant={"secondary"} className="text-xs">
          8
        </Badge>
      </CardHeader>
      <CardContent>
        <ul>
          {orders.map((order, i) => (
            <li
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              key={order.name + i}
              className="flex justify-between items-center border-b last:border-b-0 py-2"
            >
              <div className="flex items-center gap-2">
                <Badge className="rounded-full h-10 w-10" variant="secondary">
                  <OrderProgressIcon />
                </Badge>
                <div>
                  <Typography className="text-sm">{order.name}</Typography>
                  <Typography muted className="flex items-center">
                    {order.icons.map((icon) => (
                      // biome-ignore lint/correctness/useJsxKeyInIterable: <explanation>
                      <Icon
                        icon={icon}
                        className="text-stone-500 me-1"
                        size="small"
                      />
                    ))}
                    • Assigned {order.assignedDaysAgo}d ago •{" "}
                    {currencyFormatter.format(order.price)} • {order.client}
                  </Typography>
                </div>
              </div>
              <Button variant="icon" aria-label="Edit order">
                <ExternalLinkIcon />
              </Button>
            </li>
          ))}
        </ul>
        <Button className="mt-4">View All</Button>
      </CardContent>
    </Card>
  );
};

const RequestsInProgress = () => {
  const requests = [
    {
      name: "Rev Up Innovation",
      icons: ["search-alt", "diploma"],
      daysAgo: 7,
      price: 2100,
      client: "OpenFort",
    },
    {
      name: "Ignite Mobility",
      icons: ["search-alt", "rr-file", "file-add"],
      daysAgo: 10,
      price: 3150,
      client: "USE",
    },
    {
      name: "Gear Up for Change",
      icons: ["refresh"],
      daysAgo: 7,
      price: 2100,
      client: "GreenHill",
    },
    {
      name: "Drive the Future",
      icons: ["search-alt", "diploma"],
      daysAgo: 7,
      price: 2100,
      client: "Tocomo",
    },
  ];

  return (
    <Card className="mb-4">
      <CardHeader className="flex gap-2 flex-row items-center">
        <CardTitle>Requests In Progress</CardTitle>
        <Badge variant={"secondary"} className="text-[10px]">
          {requests.length}
        </Badge>
      </CardHeader>
      <CardContent>
        <ul>
          {requests.map((request) => (
            <li
              key={request.name}
              className="flex justify-between items-center border-b last:border-b-0 py-2"
            >
              <div className="flex items-center gap-2">
                <Badge className="rounded-full h-10 w-10" variant="secondary">
                  <RequestProgressIcon />
                </Badge>
                <div>
                  <Typography className="text-sm">{request.name}</Typography>
                  <Typography muted className="flex items-center">
                    {request.icons.map((icon) => (
                      // biome-ignore lint/correctness/useJsxKeyInIterable: <explanation>
                      <Icon
                        icon={icon}
                        className="text-stone-500 me-1"
                        size="small"
                      />
                    ))}
                    • {request.daysAgo} days •{" "}
                    {currencyFormatter.format(request.price)} • {request.client}
                  </Typography>
                </div>
              </div>
              <Button variant="icon" aria-label="Edit request">
                <ExternalLinkIcon />
              </Button>
            </li>
          ))}
        </ul>
        <Button className="mt-4">View All</Button>
      </CardContent>
    </Card>
  );
};

const lineGraphSettings = {
  maintainAspectRatio: false,
  scales: {
    x: {
      display: false,
    },
    y: {
      display: false,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
  elements: {
    point: {
      radius: 0,
    },
    line: {
      tension: 0.4,
    },
  },
};

type CardType = {
  title: string;
  value: string;
  subtitle: React.ReactNode;
  footerTitle: string;
  footerValue: string;
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
      backgroundColor: string;
    }[];
  };
};

export const CardComponent = ({
  title,
  value,
  subtitle,
  footerTitle,
  footerValue,
  data,
}: CardType) => {
  return (
    <Card className="p-0 border flex flex-col  py-2">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <Typography className="text-2xl font-bold">{value}</Typography>
        <Typography className="text-sm" muted>
          {" "}
          {subtitle}{" "}
        </Typography>
      </CardHeader>
      <CardContent className="p-1 flex-1">
        <div className="h-[120px] px-6">
          <Line data={data} options={lineGraphSettings} />
        </div>
      </CardContent>
      <div className="flex justify-between items-center px-4">
        <Typography className=" font-semibold" muted>
          {footerTitle}
        </Typography>
        <Typography className=" font-bold ">{footerValue}</Typography>
      </div>
    </Card>
  );
};

const DashboardPage = () => {
  const navigate = useNavigate();
  return (
    <div className="dashboard-page page-root">
      <div className="flex-grow flex gap-4 items-center mb-5">
        <Badge
          variant={"secondary"}
          className=" h-16 w-16 flex items-center justify-center rounded-full"
        >
          <BriefcaseBusiness />
        </Badge>
        <div>
          <H3 className="text-xl">Acme Business</H3>
          <Muted>
            Acme Business is lorem ipsum first few lines description lorem ipsum
          </Muted>
        </div>
      </div>
      <div className="grid grid-cols-10 gap-4">
        <div className="col-span-10 sm:col-span-5 xl:col-span-3">
          <StatsCard
            title="Products Available"
            value={956}
            icon={<CartIcon />}
            footer={
              <Button onClick={() => navigate("/marketplace")}>
                Explore marketplace
              </Button>
            }
          />
        </div>
        <div className="col-span-10 sm:col-span-5 xl:col-span-3">
          <StatsCard
            title="Products Produced"
            value={12}
            icon={
              <Icon icon={"default"} size="large" className="text-stone-500" />
            }
            footer={<Button>Get Certified as OASP</Button>}
          />
        </div>
        <div className="col-span-10 xl:col-span-4">
          <OrdersCard />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        <CardComponent
          title="Spend (this month)"
          value="₹120,250"
          subtitle={
            <>
              <span className="text-green-500">+2.5%</span> from last month
            </>
          }
          footerTitle="Total Revenue"
          footerValue="₹1,322,330"
          data={spendData}
        />
        <CardComponent
          title="Cost Saved (this month)"
          value="₹120,250"
          subtitle={
            <>
              <span className="text-red-500">-1.5%</span> from last month
            </>
          }
          footerTitle="Total Cost Saved"
          footerValue="₹22,330"
          data={costSavedData}
        />
        <CardComponent
          title="New Subscriptions (this month)"
          value="₹120,250"
          subtitle={
            <>
              <span className="text-green-500">+2.5%</span> from last month
            </>
          }
          footerTitle="Total Subscribers"
          footerValue="330"
          data={subscriptionsData}
        />

        <Card>
          <CardHeader>
            <CardTitle>Top 5 Spend</CardTitle>
          </CardHeader>
          <CardContent className="p-1" style={{ height: "260px" }}>
            <Bar
              data={topSpendData}
              options={{
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
              }}
            />
          </CardContent>
        </Card>
      </div>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <OrdersInProgressCard />
        <RequestsInProgress />
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <Card className=" col-span-2 lg:col-span-1">
          <CardHeader>
            <CardTitle>Top 5 Spend</CardTitle>
          </CardHeader>
          <CardContent>
            <Bar data={topSpendData} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const spendData = {
  labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
  datasets: [
    {
      label: "Spend",
      data: [120250, 130000, 125000, 140000],
      borderColor: "#666",
      backgroundColor: "rgba(75, 192, 192, 0.2)",
    },
  ],
};

const costSavedData = {
  labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
  datasets: [
    {
      label: "Cost Saved",
      data: [7430, 8000, 7600, 8200],
      borderColor: "#666",
      backgroundColor: "rgba(153, 102, 255, 0.2)",
    },
  ],
};

const subscriptionsData = {
  labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
  datasets: [
    {
      label: "New Subscriptions",
      data: [97, 100, 105, 110],
      borderColor: "#666",
      backgroundColor: "rgba(255, 159, 64, 0.2)",
    },
  ],
};

const topSpendData = {
  labels: ["Marketing", "Operations", "R&D", "Sales", "IT"],
  datasets: [
    {
      label: "Top Spend",
      data: [120, 100, 80, 60, 40],
      backgroundColor: [
        "rgba(102, 102, 102, 0.1)",
        "rgba(102, 102, 102, 0.1)",
        "rgba(102, 102, 102, 0.1)",
        "rgba(102, 102, 102, 0.1)",
        "rgba(102, 102, 102, 0.1)",
      ],
      borderWidth: 0,
      barThickness: 10, // Assuming default thickness is higher, adjust as needed
    },
  ],
};

export default DashboardPage;
