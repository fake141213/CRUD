# ระบบจัดการข้อมูลนักศึกษา

เว็บแอปสำหรับจัดการข้อมูลนักศึกษา สร้างด้วย Next.js App Router, TypeScript,
Tailwind CSS และ Prisma 7 ใช้ SQLite เป็นฐานข้อมูล

## ความต้องการของระบบ

- Node.js 20.9 ขึ้นไป
- npm

## ติดตั้งและเริ่มใช้งาน

1. Clone โปรเจกต์และเข้าโฟลเดอร์

   ```bash
   git clone https://github.com/fake141213/CRUD.git
   cd CRUD
   ```

2. ติดตั้ง dependencies

   ```bash
   npm install
   ```

3. สร้างไฟล์ `.env` ที่ root ของโปรเจกต์ โดยกำหนดตำแหน่งฐานข้อมูล SQLite

   ```env
   DATABASE_URL="file:./dev.db"
   ```

   ไฟล์ `.env` และฐานข้อมูล `dev.db` เป็นไฟล์เฉพาะเครื่อง ไม่ควร commit หรือ
   ส่งขึ้น Git

4. สร้าง Prisma Client และสร้าง/อัปเดตฐานข้อมูลตาม migrations

   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

   Schema อยู่ที่ [`prisma/schema.prisma`](./prisma/schema.prisma) และ migrations
   อยู่ที่ [`prisma/migrations`](./prisma/migrations)

5. เริ่มเซิร์ฟเวอร์สำหรับพัฒนา

   ```bash
   npm run dev
   ```

6. เปิด [http://localhost:3000](http://localhost:3000) หรือไปที่
   [http://localhost:3000/students](http://localhost:3000/students)

## วิธีใช้งาน

- **ดูรายชื่อนักศึกษา:** เปิดหน้า `/students` เพื่อดูข้อมูลและจำนวนนักศึกษา
- **เพิ่มนักศึกษา:** กด “เพิ่มนักศึกษา” กรอกรหัสนักศึกษา ชื่อ สาขา และชั้นปี
  โดยอีเมลเป็นข้อมูลไม่บังคับ ชั้นปีต้องอยู่ระหว่าง 1 ถึง 8 และรหัสนักศึกษาต้องไม่ซ้ำ
- **แก้ไขข้อมูล:** กด “แก้ไข” ในแถวของนักศึกษาที่ต้องการ แล้วบันทึกการเปลี่ยนแปลง
- **ลบนักศึกษา:** กด “ลบ” และยืนยันการลบในหน้าต่างยืนยัน

## คำสั่งที่ใช้บ่อย

```bash
npm run dev                 # เริ่มเซิร์ฟเวอร์พัฒนา
npm run lint                # ตรวจรูปแบบและข้อผิดพลาดของโค้ด
npx prisma studio           # เปิดหน้าจัดการดูข้อมูลในฐานข้อมูล
npx prisma migrate dev      # สร้าง/ใช้ migration ระหว่างพัฒนา
npx prisma generate         # สร้าง Prisma Client
npm run build               # สร้าง production build
npm run start               # รัน production build
```

เมื่อแก้ [`prisma/schema.prisma`](./prisma/schema.prisma) ให้สร้าง migration
พร้อมชื่อที่อธิบายการเปลี่ยนแปลง เช่น:

```bash
npx prisma migrate dev --name add_student_field
```

## โครงสร้างสำคัญ

```text
app/
  students/
    actions.ts          # Server Actions สำหรับเพิ่ม แก้ไข และลบ
    page.tsx            # หน้ารายชื่อนักศึกษา
    create/page.tsx     # หน้าเพิ่มนักศึกษา
    [id]/edit/page.tsx  # หน้าแก้ไขนักศึกษา
lib/
  prisma.ts             # Prisma Client และ SQLite adapter
prisma/
  migrations/           # ประวัติการเปลี่ยนแปลงฐานข้อมูล
  schema.prisma         # Prisma schema
```
