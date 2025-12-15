import {
  faAngleDown,
  faAngleUp,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ChartComponent from "./components/Chart";
import Top from "./components/Top";

const overview = [
  {
    title: "Tổng doanh thu",
    value: "100.000.000 đ",
    icon: faChartLine,
    trend: 12,
  },
  {
    title: "Số vé đặt",
    value: "1.000",
    icon: faChartLine,
    trend: 8,
  },
  {
    title: "Số vé hủy",
    value: "500",
    icon: faChartLine,
    trend: 5,
  },
  {
    title: "Tỉ lệ lấp đầy",
    value: "75%",
    icon: faChartLine,
    trend: -10,
  },
];

export default function AnalystPage() {
  return (
    <div className="p-6">
      <div className="shadow-md rounded-md p-4">
        {/* overview */}
        <div className="flex justify-between items-center pb-6">
          <p className="font-bold text-2xl">Tổng quan</p>
          <div className="bg-slate-200 rounded-md py-2 px-4 cursor-pointer">
            <p className="text-slate-700">30 ngày gần đây</p>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {overview.map((item, index) => {
            const isUpTrend =
              item.trend > 0
                ? "text-green-600"
                : item.trend === 0
                ? "text-gray-600"
                : "text-red-600";
            return (
              <div key={index} className="py-4 text-center flex flex-col gap-1">
                <div className="flex justify-center ">
                  <FontAwesomeIcon icon={faChartLine} className=" w-10 h-10" />
                </div>
                <p className="text-xl font-semibold">{item.title}</p>
                <p className="text-3xl font-bold">{item.value}</p>
                <div
                  className={`flex justify-center items-center gap-2 ${isUpTrend}`}
                >
                  <FontAwesomeIcon
                    icon={item.trend > 0 ? faAngleUp : faAngleDown}
                    className="w-8 h-8"
                  />
                  <span className="text-2xl font-semibold">{item.trend} %</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Hàng 2 - Biểu đồ thống kê */}
      <div className="grid grid-cols-10 gap-4 mt-4 shadow-md rounded-md p-4">
        {/* Biểu đồ */}
        <div className="col-span-7">
          <div className="text-black/80 flex justify-between items-center">
            <p className="text-lg font-semibold">Biểu đồ thống kê</p>
            <div className=" px-4 py-2 bg-slate-200 text-slate-700 rounded-md cursor-pointer">
              Tháng 8
            </div>
          </div>
          <div>
            <ChartComponent />
          </div>
        </div>

        {/* Thống kê top giờ nhiều vé / loại xe nhiều vé */}
        <div className="col-span-3 p-4">
          <Top />
        </div>
      </div>
    </div>
  );
}
