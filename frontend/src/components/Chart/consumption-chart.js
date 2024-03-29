import React, { useMemo } from "react"

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

// import { useConsumption } from "../../hooks/use-consumption"
// import { ConsumptionDatum } from "../common/types"

// export type RawData = {
//   ref_time: {
//     normal: number
//     operational: number
//     mandatory: number
//   }
//   proof_size: {
//     normal: number
//     operational: number
//     mandatory: number
//   }
//   count: number
// }

// type Props = {
//   data: ConsumptionDatum[] // The updated prop type to match the new data structure.
//   grouping: string
//   refTimeDisplayed: boolean
//   proofSizeDisplayed: boolean
// }

// let ChartDatum = {
//   date: string // Used for labeling the x-axis.
//   avgRefTimeNormal: number
//   avgRefTimeOperational: number
//   avgRefTimeMandatory: number
//   avgRefTimeTotal: number
//   avgProofSizeNormal: number
//   avgProofSizeOperational: number
//   avgProofSizeMandatory: number
//   avgProofSizeTotal: number
// }

const colors = {
  ref_time: {
    normal: "#D32F2F", // Red 700
    operational: "#1976D2", // Blue 700
    mandatory: "#388E3C", // Green 700
    total: "#FBC02D", // Yellow 700
  },
  proof_size: {
    normal: "#7B1FA2", // Purple 700
    operational: "#F57C00", // Orange 700
    mandatory: "#C2185B", // Pink 700
    total: "#00796B", // Teal 700
  },
}

const ConsumptionChart = ({
  data,
  refTimeDisplayed,
  proofSizeDisplayed,
}) => {

  const formatData = (data) => {
    return data.map((datum) => ({
      date: datum.group,
      avgRefTimeNormal: datum.ref_time.normal / datum.count,
      avgRefTimeOperational: datum.ref_time.operational / datum.count,
      avgRefTimeMandatory: datum.ref_time.mandatory / datum.count,
      avgRefTimeTotal:
        (datum.ref_time.normal +
          datum.ref_time.operational +
          datum.ref_time.mandatory) /
        datum.count,
      avgProofSizeNormal: datum.proof_size.normal / datum.count,
      avgProofSizeOperational: datum.proof_size.operational / datum.count,
      avgProofSizeMandatory: datum.proof_size.mandatory / datum.count,
      avgProofSizeTotal:
        (datum.proof_size.normal +
          datum.proof_size.operational +
          datum.proof_size.mandatory) /
        datum.count,
    }))
  }

  const formattedData = useMemo(() => formatData(data), [data])

  const formatYAxisTick = (value) => `${(value * 100).toFixed(2)}%`
  const formatTooltip = (value, name) => {
    return `${(value * 100).toFixed(2)}%`
  }

  return (
    <div className="w-full rounded-lg p-4 shadow-md dark:bg-gray-900 dark:text-white text-white">
      <ResponsiveContainer width="100%" height={500}>
        <LineChart
          data={formattedData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis tickFormatter={formatYAxisTick} />
          <Tooltip
            formatter={formatTooltip}
            wrapperClassName="rounded-md text-black dark:text-white !bg-background p-2 shadow-md dark:shadow-lg"
            labelClassName="mb-2 p-0"
            itemStyle={{ padding: "0" }}
          />
          <Legend />
          {refTimeDisplayed && (
            <>
              <Line
                type="monotone"
                dataKey="avgRefTimeNormal"
                stroke={colors.ref_time.normal}
                name="MACD"
                activeDot={{ r: 6 }}
              />
              {/* <Line
                type="monotone"
                dataKey="avgRefTimeOperational"
                stroke={colors.ref_time.operational}
                name="Ref Time Operational"
                activeDot={{ r: 6 }}
              /> */}
              <Line
                type="monotone"
                dataKey="avgRefTimeMandatory"
                stroke={colors.ref_time.mandatory}
                name="SIGNAL"
                activeDot={{ r: 6 }}
              />
              {/* <Line
                type="monotone"
                dataKey="avgRefTimeTotal"
                stroke={colors.ref_time.total}
                name="Ref Time Total"
                activeDot={{ r: 6 }}
              /> */}
            </>
          )}
          {proofSizeDisplayed && (
            <>
              {/* <Line
                type="monotone"
                dataKey="avgProofSizeNormal"
                stroke={colors.proof_size.normal}
                name="Proof Size Normal"
                strokeDasharray="8 2"
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="avgProofSizeOperational"
                stroke={colors.proof_size.operational}
                name="Proof Size Operational"
                strokeDasharray="8 2"
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="avgProofSizeMandatory"
                stroke={colors.proof_size.mandatory}
                name="Proof Size Mandatory"
                strokeDasharray="8 2"
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="avgProofSizeTotal"
                stroke={colors.proof_size.total}
                name="Proof Size Total"
                strokeDasharray="8 2"
                activeDot={{ r: 6 }}
              /> */}
            </>
          )}
        </LineChart>
      </ResponsiveContainer>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </div>
  )
}

export default ConsumptionChart
