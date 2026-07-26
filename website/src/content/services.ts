/**
 * Service catalogue, owned per division.
 *
 * EMPTY BY DESIGN. No service list has been supplied for any division, and
 * inventing one would put fictional offerings on a corporate site. The types
 * are ready; the data is not.
 *
 * Note on scope: detailed service content belongs on the division websites
 * (advisory.nivogroup.ly, it.nivogroup.ly). Entries here should stay at the
 * summary level the group site needs.
 */

import type { DivisionId } from './divisions';
import type { Localized } from './i18n';

export type ServiceStatus = 'active' | 'planned' | 'retired';

/**
 * Grouping key for a future /services page. Values are structural, not
 * marketing labels — rename freely once a real taxonomy is agreed.
 */
export type ServiceCategory = 'advisory' | 'technology' | 'finance' | 'other';

export interface Service {
  /** Stable key, referenced from Division.serviceIds. */
  id: string;

  /** Division that owns and delivers this service. */
  divisionId: DivisionId;

  title: Localized;

  /** Card-length summary. */
  shortDescription: Localized;

  /** Full description for a future service or division page. */
  longDescription: Localized;

  category: ServiceCategory;

  status: ServiceStatus;
}

export const services: readonly Service[] = [];

/** Services cleared for public display. */
export const activeServices: readonly Service[] = services.filter(
  (service) => service.status === 'active'
);

export const getService = (id: string): Service | undefined =>
  services.find((service) => service.id === id);

export const getServicesForDivision = (divisionId: DivisionId): readonly Service[] =>
  services.filter((service) => service.divisionId === divisionId);

export const getServicesByCategory = (category: ServiceCategory): readonly Service[] =>
  services.filter((service) => service.category === category);
