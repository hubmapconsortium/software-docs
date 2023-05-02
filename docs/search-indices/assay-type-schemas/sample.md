---
layout: page
---
# sample

## Overview:
Metadata schema

### Last Updated: 2023-04-25

### Version 0 (current)

## Metadata Schema

| Attribute | Description | shared/unique | enum | required | format | required if | type | pattern (regular expression) | url |
|-----------|-------------|---------------|------|----------|--------|-------------|------|------------------------------|-----|
| sample_id | (No description for this field was supplied.) Example: VAN0010-LK-152-162. | IDs |   | True |   |   |   | ([A-Z]+[0-9]+)-[A-Z]{2}\d*(-\d+)+(_\d+)? |   |
| vital_state | Identify the vital state of the donor. | Donor | living or deceased | True |   |   |   |   |   |
| health_status | Patient’s baseline physical condition prior to immediate event leading to organ/tissue acquisition. For example, if a relatively healthy patient suffers trauma, and as a result of reparative surgery, a tissue sample is collected, the subject will be deemed “relatively healthy”.   Likewise, a relatively healthy subject may have experienced trauma leading to brain death.  As a result of organ donation, a sample is collected.  In this scenario, the subject is deemed “relatively healthy.”. | Donor | cancer, relatively healthy, or chronic illness | True |   |   |   |   |   |
| organ_condition | Health status of the organ at the time of sample recovery. | Medical Procedure | healthy or diseased | True |   |   |   |   |   |
| procedure_date | Date of procedure to procure organ. | Medical Procedure |   | True | %Y-%m-%d |   | date |   |   |
| perfusion_solution | Type of solution that was used to perfuse the organ. | Medical Procedure | UWS, HTK, Belzer MPS/KPS, Formalin, Perfadex, Unknown, or None | True |   |   |   |   |   |
| pathologist_report | Further details on organ level QC checks. | Medical Procedure |   | True |   |   |   |   |   |
| warm_ischemia_time_value | Time interval between cessation of blood flow and cooling to 4C. Leave blank if not applicable. | Medical Procedure |   | False |   |   | number |   |   |
| warm_ischemia_time_unit | Time unit. Leave blank if not applicable. | Medical Procedure | minutes | False |   | warm_ischemia_time_value present |   |   |   |
| cold_ischemia_time_value | Time interval on ice to the start of preservation protocol. Leave blank if not applicable. | Medical Procedure |   | False |   |   | number |   |   |
| cold_ischemia_time_unit | Time unit. Leave blank if not applicable. | Medical Procedure | minutes | False |   | cold_ischemia_time_value present |   |   |   |
| specimen_preservation_temperature | The temperature of the medium during the preservation process. | Biospecimen | Liquid Nitrogen, Liquid Nitrogen Vapor, Freezer (-80 Celsius), Freezer (-20 Celsius), Refrigerator (4 Celsius), or Room Temperature | True |   |   |   |   |   |
| specimen_quality_criteria | For example, RIN: 8.7. Leave blank if not applicable. | Biospecimen |   | False |   |   |   |   |   |
| specimen_tumor_distance_value | If surgical sample, how far from the tumor was the sample obtained from. Typically a number of centimeters. Leave blank if not applicable or unknown. Leave blank if not applicable. | Biospecimen |   | False |   |   | number |   |   |
| specimen_tumor_distance_unit | Distance unit. Leave blank if not applicable. | Biospecimen | cm | False |   | specimen_tumor_distance_value present |   |   |   |
