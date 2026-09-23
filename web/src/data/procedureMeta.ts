import type { SchematicPartId } from '@/components/training/MachineSchematic'

export const repairMeta: {
  highlight: SchematicPartId
  footer: string
  callout: string
  subtitle: string
}[] = [
  { highlight: 'SEPARATOR TANK', footer: 'SEPARATOR TANK — BRINE LEVEL RISING', callout: 'Brine level', subtitle: 'Unexpected rise detected' },
  { highlight: 'EJECTOR', footer: 'COMBINED EJECTOR — DIAGNOSIS', callout: 'Compare readings', subtitle: 'Ejector vs brine level' },
  { highlight: 'EJECTOR', footer: 'CONTROL PANEL — STOP ORDER', callout: 'Stop installation', subtitle: 'Order confirmed' },
  { highlight: 'EJECTOR', footer: 'LOCKOUT POINT — TAG OUT', callout: 'Combined ejector', subtitle: 'Lockout point pending' },
  { highlight: 'EJECTOR', footer: 'CIRCUIT DRAIN — SAFE STATE', callout: 'Drain circuit', subtitle: 'Before opening cover' },
  { highlight: 'EJECTOR', footer: 'EJECTOR COVER — OPEN', callout: 'Ejector cover', subtitle: 'Cover removed' },
  { highlight: 'EJECTOR', footer: 'NOZZLE INSPECTION', callout: 'Nozzle', subtitle: 'Wear check' },
  { highlight: 'EJECTOR', footer: 'NOZZLE REPLACEMENT', callout: 'Replace part', subtitle: 'New nozzle installed' },
  { highlight: 'EJECTOR', footer: 'REASSEMBLY — TORQUE', callout: 'Reassemble', subtitle: 'Torque to spec' },
  { highlight: 'EJECTOR', footer: 'RESTART — LOCKOUT REMOVED', callout: 'Restart', subtitle: 'Ready to run' },
]

export const startupMeta: {
  highlight: SchematicPartId
  footer: string
  callout: string
  subtitle: string
  vacuum?: string
  valve?: string
}[] = [
  { highlight: 'EJECTOR', footer: 'SUCTION VALVE — OPEN', callout: 'Suction valve', subtitle: 'Open first', vacuum: '0%', valve: 'Opening' },
  { highlight: 'EJECTOR', footer: 'DISCHARGE VALVE — OPEN', callout: 'Discharge valve', subtitle: 'Second in sequence', vacuum: '5%', valve: 'Open' },
  { highlight: 'EJECTOR', footer: 'OVERBOARD DISCHARGE — OPEN', callout: 'Overboard valve', subtitle: 'Discharge path clear', vacuum: '8%', valve: 'Open' },
  { highlight: 'SEPARATOR TANK', footer: 'AIR VENT SCREW — CLOSED', callout: 'Air vent', subtitle: 'Screw closed', vacuum: '12%', valve: 'Open' },
  { highlight: 'EJECTOR', footer: 'EJECTOR PUMP — STARTING', callout: 'Ejector pump', subtitle: 'Pump running', vacuum: '35%', valve: 'Open' },
  { highlight: 'EJECTOR', footer: 'VACUUM RISE — 90% / 15s', callout: 'Vacuum level', subtitle: '63% · Suction valve open', vacuum: '63%', valve: 'Open' },
  { highlight: 'EVAPORATOR', footer: 'JACKET WATER INLET — OPEN', callout: 'Jacket water', subtitle: 'Heating side open', vacuum: '90%', valve: 'Open' },
  { highlight: 'CONDENSER', footer: 'SEAWATER FEED — OPEN', callout: 'Seawater feed', subtitle: 'Feed established', vacuum: '92%', valve: 'Open' },
  { highlight: 'SEPARATOR TANK', footer: 'DISTILLATION — RUNNING', callout: 'Distillation', subtitle: 'Process started', vacuum: '94%', valve: 'Open' },
  { highlight: 'EJECTOR', footer: 'SALINITY CHECK', callout: 'Salinometer', subtitle: 'Quality check', vacuum: '95%', valve: 'Open' },
  { highlight: 'CONDENSER', footer: 'FLOW STABILIZATION', callout: 'Product flow', subtitle: 'Stabilizing', vacuum: '95%', valve: 'Open' },
  { highlight: 'SEPARATOR TANK', footer: 'INSTRUMENTS — CONFIRM', callout: 'Instruments', subtitle: 'All green', vacuum: '95%', valve: 'Open' },
  { highlight: 'SEPARATOR TANK', footer: 'PARAMETERS LOGGED', callout: 'Log complete', subtitle: 'Startup finished', vacuum: '95%', valve: 'Open' },
]
